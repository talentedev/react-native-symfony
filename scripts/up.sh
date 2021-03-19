#!/bin/bash

set -e

OS=`uname -s`

if [[ "$OS" == "Darwin" ]]; then
    if [[ ! -f .osx_setup_done ]]; then
# UPDATE: 2018-11-13 The Moby VM no longer allows NFS volumes but Docker for Mac now supports them.
#        ./scripts/setup_native_nfs_docker_osx.sh

        echo -e "\n\033[0;32mCreating docker-compose.override.yml\033[0m"
        cp ./deployments/docker-compose/docker-compose.override.yml docker-compose.override.yml

        touch .osx_setup_done
    fi
    export HOST_IP=`ipconfig getifaddr en0`
else
    export HOST_IP=`ip route get 8.8.8.8 | awk -F"src " 'NR==1{split($2,a," ");print a[1]}'`
fi

if [[ ! -f .env ]]; then
    echo -e "\n\033[0;32mRunning\033[0m cp .env.template .env"
    cp .env.template .env
fi

echo -e "\n\033[0;32mOptional background mode\033[0m"
read -p "Enter 'bg' to start your stack in background mode: " BG

if [[ "$BG" == "bg" ]]; then
    echo -e "\033[0;32mOk starting stack in background!\033[0m\n"
    docker-compose up -d
else
    echo -e "\033[0;32mAlright, starting stack in foreground!\033[0m\n"
    docker-compose up
fi