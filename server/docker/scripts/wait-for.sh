#!/bin/sh

host="$1"

until nc -z $host 27017
do
  echo "Waiting for database..."
  sleep 2
done