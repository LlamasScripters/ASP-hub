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
EXPOSE 5173

# Set development environment
ENV NODE_ENV=development

# Use Vite dev server with host binding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ===========================================
# Build Stage (Production)
# ===========================================
FROM dev-deps AS build
WORKDIR /app

COPY . .
RUN npm run build

# ===========================================
# Production Stage
# ===========================================
FROM nginx:1.29.0-alpine AS production

RUN adduser -D -H -u 1001 -s /sbin/nologin webuser

RUN mkdir -p /app/www

COPY nginx/prod.conf /etc/nginx/templates/default.conf.template

COPY --from=build /app/dist /app/www
RUN chown -R webuser:webuser /app/www && \
    chmod -R 755 /app/www && \
    chown -R webuser:webuser /var/cache/nginx && \
    chown -R webuser:webuser /var/log/nginx && \
    chown -R webuser:webuser /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R webuser:webuser /var/run/nginx.pid && \
    chmod -R 777 /etc/nginx/conf.d

EXPOSE 80

ENV NGINX_ENVSUBST_TEMPLATE_DIR=/etc/nginx/templates
ENV NGINX_ENVSUBST_TEMPLATE_SUFFIX=.template
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d

USER webuser

CMD ["nginx", "-g", "daemon off;"]