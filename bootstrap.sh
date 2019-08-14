#!/bin/sh
echo "[BOOTSTRAP] INSTALLING AT ROOT"
yarn install

echo "[BOOSTRAP] INSTALLING AT FRONT"
cd frontend || exit
yarn install
cd ..

echo "[BOOTSTRAP] INSTALLING AT BACKEND"
cd backend || exit
yarn install
cd ..

echo "[BOOTSTRAP] DONE"
