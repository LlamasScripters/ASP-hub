FROM node:22.15.0-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

# Builder
FROM base AS builder

WORKDIR /app

RUN npm run db:generate

RUN npm run build

RUN npm prune --omit=dev

# Production
FROM node:22.15.0-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/drizzle /app/drizzle

EXPOSE 3000

USER node

ENTRYPOINT ["node"]