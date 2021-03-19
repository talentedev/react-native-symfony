FROM doctrine/php:7.2-v2-apache-node10

COPY --chown=docker:docker . .

RUN composer install &&\
    npm install &&\
    npm run build
