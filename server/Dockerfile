# ===========================================
# Development Dependencies Stage
# ===========================================
FROM node:22.15.0-alpine AS dev-deps
WORKDIR /app

# Copy package files for better caching
COPY package.json package-lock.json ./
RUN npm ci

# ===========================================
# Development Target
# ===========================================
FROM dev-deps AS development
WORKDIR /app

# Copy source code
COPY . .

# Expose development port
EXPOSE 3000

# Set development environment
ENV NODE_ENV=development

# Use tsx for development with watch mode
CMD ["npm", "run", "dev"]

# ===========================================
# Build Stage (Production)
# ===========================================
FROM dev-deps AS builder
WORKDIR /app

COPY . .
RUN npm run db:generate
RUN npm run build
RUN npm prune --omit=dev

# ===========================================
# Production Stage
# ===========================================
FROM node:22.15.0-alpine AS production
WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/migrations/production /app/migrations/production

ENV ENV_FILE=/run/secrets/env
EXPOSE 3000
USER node
CMD ["node", "--env-file-if-exists=${ENV_FILE}", "dist/index.js"]