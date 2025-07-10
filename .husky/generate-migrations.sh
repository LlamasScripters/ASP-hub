#!/bin/bash

# Script to generate Drizzle migrations when on main branch and schema has changed
# This script is called by the pre-commit hook

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Check if we're on main branch
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}ℹ️  Skipping migration generation (not on main branch)${NC}"
    exit 0
fi

# Check if schema file has changed in staged files
SCHEMA_FILE="server/src/db/schema.ts"
if ! git diff --cached --name-only | grep -q "^$SCHEMA_FILE$"; then
    echo -e "${YELLOW}ℹ️  Skipping migration generation (schema file not changed)${NC}"
    exit 0
fi

echo -e "${GREEN}🔍 Detected schema changes on main branch${NC}"
echo -e "${GREEN}🔄 Generating Drizzle migrations...${NC}"

# Change to server directory and generate migrations
cd server

# Generate migrations using npx (no DB connection needed)
if npx drizzle-kit generate; then
    echo -e "${GREEN}✅ Migrations generated successfully${NC}"
    
    # Add generated migration files to git (specific to production output folder)
    if [ -d "./drizzle/production" ]; then
        git add ./drizzle/production/
        echo -e "${GREEN}📁 Added generated migration files to commit${NC}"
    fi
else
    echo -e "${RED}❌ Failed to generate migrations${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Migration generation completed${NC}"