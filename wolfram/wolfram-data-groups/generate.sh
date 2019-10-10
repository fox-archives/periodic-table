#!/bin/sh

set -e

echo "GENERATE basic-atom-properties"
cd basic-atom-properties || exit
./generate.sh
cd ..

echo "GENERATE material-properties"
cd material-properties || exit
./generate.sh
cd ..

echo "GENERATE thermodynamic-properties"
cd thermodynamic-properties || exit
./generate.sh
cd ..

echo "GENERATE electromagnetic-optical-proeprties"
cd electromagnetic-optical-properties || exit
./generate.sh
cd ..

echo "GENERATE abundance-properties"
cd abundance-properties || exit
./generate.sh
cd ..

echo "GENERATE atomic-properties"
cd atomic-properties || exit
./generate.sh
cd ..
