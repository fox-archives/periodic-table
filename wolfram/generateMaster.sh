#!/bin/sh

cd atom-layout-data || exit
./generate.sh
cd ..

cd wolfram-data-groups || exit
./generate.sh
cd ..
