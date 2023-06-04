FROM composer:latest

WORKDIR /var/www/html

ENTRYPOINT ["composer", "--ignore-platform-reqs"]

##리눅스 사용자에 permission error가 뜬 경우는 composer.dockerfile의 내용을 아래와 같이 수정할 것

FROM composer:2.5.7

RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel

USER laravel

WORKDIR /var/www/html

ENTRYPOINT ["composer", "--ignore-platform-reqs"]
