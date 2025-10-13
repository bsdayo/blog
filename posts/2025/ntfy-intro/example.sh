#!/bin/bash

apt update -y && apt dist-upgrade -y
sed -i 's/bookworm/trixie/g' /etc/apt/source.list
apt update -y && apt dist-upgrade -y

# Notify me
curl -d "$HOSTNAME Upgrade finished" ntfy.sh/its-my-topic