#!/bin/bash

set -e

cleanup() {
  echo -e "\nОстанавливаем все процессы..."
  kill $CATALOG_PID $CART_PID 2>/dev/null || true
  exit 0
}
trap cleanup INT

echo "Запускаем catalog..."
npm run dev --workspace=apps/catalog &
CATALOG_PID=$!

echo "Запускаем cart..."
npm run dev --workspace=apps/cart &
CART_PID=$!

echo "Ожидаем, пока Catalog поднимется на http://localhost:3001..."
until curl -s http://localhost:3001/remoteEntry.js >/dev/null; do
  sleep 1
done
echo "✅ Catalog готов!"

echo "Ожидаем, пока Cart поднимется на http://localhost:3002..."
until curl -s http://localhost:3002/remoteEntry.js >/dev/null; do
  sleep 1
done
echo "Cart готов!"

echo "Запускаем host..."
npm run dev --workspace=apps/host

cleanup
