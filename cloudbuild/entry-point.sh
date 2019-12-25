#!/usr/bin/env sh

set -ex

rsyslogd

logger "starting nginx ..."

nginx

tail -f /var/log/messages
