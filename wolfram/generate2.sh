#!/bin/sh

# this is a separate script because the completion time is
# much much more short

cd build/atom-layout-data || exit

for item in *.wls; do
  wolframscript -script "$item"
done

cd ..
