#!/bin/sh

# Start app in development mode (on your own machine or cloud)

echo "\nStarting app in development mode...\n"

VERSION="$(cat VERSION)" docker-compose -f docker-compose.prod.yml up -d
