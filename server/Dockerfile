FROM node:22.15.0-alpine as base

RUN adduser -D -u 1001 app
USER app

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY --chown=app:app . /app

# Development
FROM base as development

RUN npm run dev

# Builder
FROM base as builder

RUN npm run build

RUN npm install --only=production

# Production
FROM base as production

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/node_modules /app/node_modules

CMD ["node", "dist/index.js"]