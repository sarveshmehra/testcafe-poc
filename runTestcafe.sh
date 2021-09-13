#!/usr/bin/env bash

echo "################################################################"
echo "#  This script will run the Testcafe POC frontend tests        #"
echo "################################################################"

function runTestcafe() {
  echo "Starting TestCafe in docker container ..."
  docker-compose up -d
  # shellcheck disable=SC2046
  hostname=$(docker-compose ps -q testcafe | docker inspect --format='{{ .Config.Hostname }}' $(xargs))
  sleep 5
  docker run -e testEnv=${env} --add-host=${hostname:=localhost}:127.0.0.1 -v ${PWD}:/poc -it testcafe/testcafe chromium /poc/tests/basic.test.js
}

function cleanup() {
  echo "Cleaning up docker-compose environment ..."
  docker-compose logs >compose.log
  docker-compose stop
  docker-compose rm -f
}

function usage() {
  echo "Run with one argument: one of  'test' or 'rm'"
}

case "$1" in
test)
  env=$2
  runTestcafe
  ;;
rm)
  cleanup
  ;;
*)
  usage
  exit 1
  ;;
esac