#개발중이라면 bind mount로 처리할 수 있지만 배포되는 image에서는 그렇게 할 수 없으므로... : 설정 파일을 그대로 image로 복사하여 집어넣기

FROM nginx:stable-alpine

WORKDIR /etc/nginx/conf.d

COPY nginx/nginx.conf .

RUN mv nginx/conf.d default.conf

WORKDIR /var/www/html

COPY src .
