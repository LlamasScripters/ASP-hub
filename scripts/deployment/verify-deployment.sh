#!/bin/bash

# Script: verify-deployment.sh
# Purpose: Verify Docker Swarm service deployment convergence
# Usage: ./verify-deployment.sh --stack-name=<name> --services=<service1,service2>

set -euo pipefail

# Default values
STACK_NAME=""
SERVICES=""
TIMEOUT=120
INTERVAL=5
HELP=false

# Function to display help
show_help() {
    cat << EOF
Usage: $0 [OPTIONS]

Verify Docker Swarm service deployment convergence by checking that all
services are running using docker service ps.

For security, this script only monitors and displays information about
services explicitly specified in the --services parameter.

OPTIONS:
    --stack-name=<string>   Docker stack name (required)
    --services=<string>     Comma-separated list of service names (required)
    --timeout=<number>      Timeout in seconds (default: 120)
    --interval=<number>     Polling interval in seconds (default: 5)
    --help                  Show this help message

EXAMPLES:
    $0 --stack-name="asphub" --services="client,server"
    $0 --stack-name="myapp" --services="web,api,db" --timeout=180

EXIT CODES:
    0   Success (all services converged)
    1   Error (timeout, service not found, or convergence failed)
EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --stack-name=*)
            STACK_NAME="${1#*=}"
            shift
            ;;
        --services=*)
            SERVICES="${1#*=}"
            shift
            ;;
        --timeout=*)
            TIMEOUT="${1#*=}"
            shift
            ;;
        --interval=*)
            INTERVAL="${1#*=}"
            shift
            ;;
        --help)
            HELP=true
            shift
            ;;
        *)
            echo "❌ Unknown option: $1" >&2
            show_help
            exit 1
            ;;
    esac
done

# Show help if requested
if [[ "$HELP" == true ]]; then
    show_help
    exit 0
fi

# Validate required arguments
if [[ -z "$STACK_NAME" ]]; then
    echo "❌ Error: --stack-name is required" >&2
    show_help
    exit 1
fi

if [[ -z "$SERVICES" ]]; then
    echo "❌ Error: --services is required" >&2
    show_help
    exit 1
fi

# Validate numeric arguments
if ! [[ "$TIMEOUT" =~ ^[0-9]+$ ]] || [[ "$TIMEOUT" -lt 1 ]]; then
    echo "❌ Error: --timeout must be a positive integer" >&2
    exit 1
fi

if ! [[ "$INTERVAL" =~ ^[0-9]+$ ]] || [[ "$INTERVAL" -lt 1 ]]; then
    echo "❌ Error: --interval must be a positive integer" >&2
    exit 1
fi

# Convert comma-separated services to array
IFS=',' read -ra SERVICES_ARRAY <<< "$SERVICES"

# Function to check if service is running
check_service_running() {
    local service_name="$1"
    local full_service_name="${STACK_NAME}_${service_name}"
    
    # Check if service has running tasks
    local running_count
    running_count=$(docker service ps "$full_service_name" --filter "desired-state=running" --format "{{.CurrentState}}" 2>/dev/null | grep -c "Running" || echo "0")
    
    if [[ "$running_count" -gt 0 ]]; then
        return 0
    else
        return 1
    fi
}

# Function to show service status
show_service_status() {
    echo "📋 Service status (deployed services only):"
    
    for service in "${SERVICES_ARRAY[@]}"; do
        local full_service_name="${STACK_NAME}_${service}"
        
        echo "  Service: $full_service_name"
        docker service ps "$full_service_name" --filter "desired-state=running" --format "    {{.Name}}\t{{.CurrentState}}\t{{.Error}}" 2>/dev/null || echo "    Service not found or no tasks"
        echo ""
    done
}

# Main verification loop
main() {
    echo "🔍 Starting deployment verification..."
    echo "⏱️  Timeout: ${TIMEOUT}s | Interval: ${INTERVAL}s | Services: ${SERVICES_ARRAY[*]}"
    echo "🔒 Security: Only monitoring explicitly deployed services"
    
    local start_time
    start_time=$(date +%s)
    
    while true; do
        local current_time
        current_time=$(date +%s)
        local elapsed=$((current_time - start_time))
        
        # Check timeout
        if [[ $elapsed -ge $TIMEOUT ]]; then
            echo "❌ Deployment verification timed out after ${TIMEOUT} seconds" >&2
            show_service_status
            return 1
        fi
        
        echo "⏳ Checking services... (elapsed: ${elapsed}s)"
        
        local all_services_ready=true
        for service in "${SERVICES_ARRAY[@]}"; do
            if check_service_running "$service"; then
                echo "✅ Service ${STACK_NAME}_${service} is running"
            else
                echo "⏳ Service ${STACK_NAME}_${service} is not running yet"
                all_services_ready=false
            fi
        done
        
        if [[ "$all_services_ready" == true ]]; then
            echo "🎉 All services are running!"
            show_service_status
            return 0
        fi
        
        echo "⏳ Waiting ${INTERVAL} seconds before next check..."
        sleep "$INTERVAL"
    done
}

# Execute deployment verification
main