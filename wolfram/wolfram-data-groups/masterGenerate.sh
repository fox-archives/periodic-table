#!/bin/sh

echo "START basic-atom-properties"
cd basic-atom-properties || exit
./generate.sh
cd ..

echo "START material-properties"
cd material-properties || exit
./generate.sh
cd ..

echo "START thermodynamic-properties"
cd thermodynamic-properties || exit
./generate.sh
cd ..

echo "START electromagnetic-optical-proeprties"
cd electromagnetic-optical-properties || exit
./generate.sh
cd ..

echo "START abundance-properties"
cd abundance-properties || exit
./generate.sh
cd ..

echo "START atomic-properties"
cd atomic-properties
./generate.sh
cd ..

# echo "START nuclear-proeprties"
# cd nuclear-properties || exit
# ./generate.sh
# cd ..

