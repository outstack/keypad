#!/bin/bash
set -e

# For repeatedly running this script, you will need to cleanup from the previous run.
# This probably wouldn't be needed in CI
docker stop keypad
docker rm keypad
docker network remove keypad

# Create a docker network and get its gateway IP
docker network create keypad
KEYPAD=$(docker network inspect --format='' keypad | docker run -i --rm realguess/jq jq -r '.[0].IPAM.Config[0].Gateway')

# Make sure keypad is running
docker run --name keypad -d -p 80:80 outstack/keypad
sleep 1

# Add our configuration as needed
curl --silent --fail -X PUT http://127.0.0.1/secret/key -d 'secret-value'

# Build, telling our Dockerfile the location of our KEYPAD server
docker build --build-arg KEYPAD=$KEYPAD .