### -*- docker-image-name: "contrasite"


ARG debian_version='bullseye-slim'
ARG nginx_version='mainline-alpine'
ARG rbenv_version='1.2.0'
ARG ruby_build_version='20230330'
ARG ruby_version='3.1.2'


FROM debian:${debian_version} AS ruby-source

RUN apt-get update
RUN apt-get install --no-install-recommends --yes curl ca-certificates clang make perl libz-dev

ARG ruby_build_version
ADD "https://github.com/rbenv/ruby-build/archive/refs/tags/v${ruby_build_version}.tar.gz" /usr/local/src/ruby-build.tar.gz
RUN tar xzf /usr/local/src/ruby-build.tar.gz -C /usr/local/src
RUN "/usr/local/src/ruby-build-${ruby_build_version}/install.sh"

ENV \
    TERM='xterm' \
    DEBIAN_FRONTEND='noninteractive' \
    CC=clang \
    CXX=clang++

ARG ruby_version
RUN ruby-build "${ruby_version}" "/opt/ruby/${ruby_version}"

ENV PATH="/opt/ruby/${ruby_version}/bin:$PATH"


FROM ruby-source AS build

ADD Gemfile Gemfile.lock /usr/local/src/contrasite/

WORKDIR /usr/local/src/contrasite

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
