#!/bin/sh

cd atom-colors || exit
wolframscript -script atomColorsCategory.wls
wolframscript -script atomColorsOrbitalBlock.wls
cd ..

cd atom-placement || exit
wolframscript -script atomPlacement.wls
cd ..

cd atom-tab-isotopes || exit
wolframscript -script atomTabIsotopes.wls
cd ..

cd atom-tab-properties || exit
wolframscript -script atomTabProperties.wls
cd ..
