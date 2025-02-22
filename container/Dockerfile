# syntax=docker/dockerfile:1.6.0-labs -*- dockerfile-image-name: "contrasite" -*-

### Dockerfile ---

## Copyright (C) 2024

### Commentary:

##

### Code:

ARG ruby_version='3.1'
ARG debian_version='bookworm'


FROM ruby:${ruby_version}-${debian_version} as site-source

ENV TERM=xterm DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install --no-install-recommends --yes clang

WORKDIR /build

ADD Gemfile Gemfile.lock .

ENV CC=clang CXX=clang++

RUN /usr/bin/bash <<'EOF'
set -o errexit -o nounset -o pipefail

bundle config set path vendor/bundle
bundle config set with development
bundle install
EOF

ADD . .

# Blow away existing _site directory so everything gets generated fresh
# (IDK why this is needed but it seems to help?)
RUN rm -rf _site/

RUN bundle exec jekyll build

RUN /usr/bin/bash <<'EOF'
set -o errexit -o nounset -o pipefail

cd _site
find . -type f -exec install --mode=0444 -D {} '/image-root/srv/http/{}' \;
EOF


FROM debian:${debian_version} AS linux-source

ENV TERM=xterm DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install --yes lighttpd ca-certificates

RUN /usr/share/lighttpd/create-mime.conf.pl >/etc/lighttpd/mimetypes.conf

RUN /usr/bin/bash <<'EOF'
set -o errexit -o nounset -o pipefail

declare files=(
    '/etc/lighttpd/mimetypes.conf'
    '/etc/nsswitch.conf'
    '/etc/ssl/certs/ca-certificates.crt'
    '/etc/timezone'
    '/usr/share/zoneinfo/Etc/UTC'
)

declare -a lighttpd_modules=(
    'accesslog'
    'status'
)

declare -a bins=(
    'nologin'
    'lighttpd'
)

declare lighttpd_module
for lighttpd_module in "${lighttpd_modules[@]}"; do
    bins+=("/usr/lib/lighttpd/mod_${lighttpd_module}.so")
done


declare bin
declare -a bin_libs
for bin in "${bins[@]}"; do
    if [[ "$bin" != '/'* ]]; then
        bin="$(command -v "$bin")"
    fi

    readarray -t -d$'\n' bin_libs < <(ldd "$bin" | grep -o '/[^ ]\+')

    files+=("$bin" "${bin_libs[@]}")
done

readarray -t -d$'\n' files < <(printf '%s\n' "${files[@]}" | sort | uniq)

declare file real_path mode
for file in "${files[@]}"; do
    real_path="$(readlink --canonicalize "$file")"

    mode="$(stat --format='%a' "$real_path")"
    if (( "${#mode}" < 4 )); then
        mode="0$mode"
    fi

    install --verbose --mode="$mode" -D "$file" /image-root"$file"
done

mkdir --parents --mode=0777 /image-root/var/tmp

mkdir --parents \
    /image-root/var/run/lighttpd \
    /image-root/var/cache/lighttpd

chown 65533:65533 \
    /image-root/var/run/lighttpd \
    /image-root/var/cache/lighttpd
EOF


FROM scratch AS image

COPY --from=linux-source /image-root /
COPY --from=site-source /image-root /
ADD container/root /


### Dockerfile ends here
