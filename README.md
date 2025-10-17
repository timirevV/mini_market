### Установка

1. git clone <URL_ТВОЕГО_REPO> mini_market
2. cd mini_market
3. npm install

### Запуск (3 варианта)

1. Либо строго поочередно в каждом терминале

- npm run dev --workspace=apps/catalog
- npm run dev --workspace=apps/cart
- npm run dev --workspace=apps/host

2. Либо одной командой 

- npx turbo run dev

3. Или же в файле start.sh в корне проекта вставляем текст ниже и выполняем команды

- chmod +x start.sh
- ./start.sh

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


