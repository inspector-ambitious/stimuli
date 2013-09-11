#!/bin/bash

CONNECT_URL="http://saucelabs.com/downloads/Sauce-Connect-latest.zip"
STARTUP_TIMEOUT=90
CONNECT_DIR="/tmp/sauce-connect-$RANDOM"
CONNECT_DOWNLOAD="Sauce_Connect.zip"
READY_FILE="connect-ready-$RANDOM"
LOG_FILE="/tmp/sauce-connect-log"
TUNNEL_IDENTIFIER=""

# If running on travis, use a tunnel identifier
if [ -n "$TRAVIS" ] && [ -n "$TRAVIS_JOB_NUMBER" ]; then
    TUNNEL_IDENTIFIER="--tunnel-identifier $TRAVIS_JOB_NUMBER"
fi

# Get Connect and start it
mkdir -p $CONNECT_DIR
cd $CONNECT_DIR
curl $CONNECT_URL -o $CONNECT_DOWNLOAD
unzip $CONNECT_DOWNLOAD
java -jar Sauce-Connect.jar --readyfile $READY_FILE \
    --logfile $LOG_FILE \
    $TUNNEL_IDENTIFIER \
    $SAUCE_USERNAME $SAUCE_ACCESS_KEY &

# Wait for Connect to be ready before exiting
while [ ! -f $READY_FILE ]; do
  sleep .5
done