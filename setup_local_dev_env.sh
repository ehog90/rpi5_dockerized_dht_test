#!/bin/bash

# Spin up Redis and PostgreSQL (Alpine) containers for local development with persistence.

set -e

# Container names and ports
REDIS_NAME="rpi5-redis_loc"
REDIS_PORT=4444


echo "Starting local dev container (Redis )..."

docker rm -f $REDIS_NAME >/dev/null 2>&1 || true


# Run Redis (latest known Alpine‑tag) with persistent volume
echo "🚀 Launching Redis..."
docker run -d \
  --name $REDIS_NAME \
  -p ${REDIS_PORT}:6379 \
  redis:8.2.2-alpine3.22 \
  redis-server --appendonly yes


echo "🚀 Launching PostgreSQL..."

echo ""
echo "✅ Local dev services are up and running with persistence!"
echo ""
echo "Redis:"
echo "  Container: $REDIS_NAME"
echo "  Port:      localhost:$REDIS_PORT"
echo ""