#!/bin/sh

echo "starting ci script"
echo ""

cd wolfram || exit
./generateAndTransform.sh
cd ..

yarn transferWolfram

cd frontend || exit
yarn prod
cd ..

yarn transferFrontend
