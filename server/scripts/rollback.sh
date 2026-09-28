#!/bin/sh

echo "Rolling back..."

docker compose down

docker compose up -d

echo "Rollback completed."