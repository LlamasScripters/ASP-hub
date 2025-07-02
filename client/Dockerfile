# Build
FROM node:22.15.0-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

COPY . /app

RUN npm run build

# Production
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