FROM php:7.4-fpm-alpine

WORKDIR /var/www/html

#배포할 때 추가되는 것
COPY src.

RUN docker-php-ext-install pdo pdo_mysql
#배포할 때 추가되는 것
#ownership을 바꾸어줌.. 권한 문제: 파일을 읽고 쓰기 때문..
RUN chown -R www-data:www-data /var/www/html


##만약 리눅스 사용자고 permission error가 발생하면 아래와 같이 dockerfile을 바꿀 것

FROM php:8.24-fpm-alpine

WORKDIR /var/www/html

COPY src .

RUN docker-php-ext-install pdo pdo_mysql

RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel

USER laravel
