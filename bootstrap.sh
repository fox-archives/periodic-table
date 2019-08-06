#!/bin/sh
echo "[BOOTSTRAP] INSTALLING AT ROOT"
npm i

echo "[BOOSTRAP] INSTALLING AT FRONT"
cd frontend || exit
npm i
cd ..

echo "[BOOTSTRAP] INSTALLING AT BACKEND"
cd backend || exit
npm i
cd ..

echo "[BOOTSTRAP] INSTALLING AT WOLFRAM"
cd wolfram || exit
npm i
cd ..

echo "[BOOTSTRAP] DONE"
