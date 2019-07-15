#!/bin/bash

cd atom-colors
wolframscript -script atomColorsCategory.wls
wolframscript -script atomColorsOrbitalBlock.wls
cd ..

cd atom-placement
wolframscript -script atomPlacement.wls
cd ..

cd atom-tab-isotopes
wolframscript -script atomTabIsotopes.wls
cd ..

cd atom-tab-properties
wolframscript -script atomTabProperties.wls
cd ..
