### -*- docker-image-name: "contrasite"


ARG nginx_version='mainline-alpine'
ARG ruby_version='3.1-bullseye'


FROM ruby:${ruby_version} AS build

RUN apt-get update
RUN apt-get install --no-install-recommends --yes clang

ADD Gemfile Gemfile.lock /usr/local/src/contrasite/

WORKDIR /usr/local/src/contrasite

ENV \
    CC=clang \
    CXX=clang++

RUN bundle config set path 'vendor/bundle'
RUN bundle config set with 'development'
RUN bundle install

ADD . .

RUN bundle exec jekyll build

RUN cd _site; \
    find . -type f -exec install -D '{}' '/image-root/usr/share/nginx/html/{}' \;

RUN install -D cloudbuild/nginx.conf /image-root/etc/nginx/conf.d/contrasite.conf


FROM nginx:${nginx_version} AS image

COPY --from=build /image-root/ /
