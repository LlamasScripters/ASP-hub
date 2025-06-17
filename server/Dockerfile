FROM node:22.15.0-alpine

# Run as a non-privileged user
RUN adduser -D -u 1001 app
USER app

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

COPY --chown=app:app . /app