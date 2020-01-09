import path from "path";
import { fileURLToPath } from "url";
import { atomArrayExtract, outputFile } from "./transform.helper.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const outputFolder = "build/atom-tab-data";

// PROPERTIES TAB
{
  const propertiesRootFileNames = [
    "1-basic-atom-properties/atomicNumber",
    "1-basic-atom-properties/atomicWeight",
    "2-material-properties/density",
    "3-thermodynamic-properties/boilingPoint",
    "3-thermodynamic-properties/meltingPoint"
  ].map(fileName => `${dirname}/wolfram-data-groups/${fileName}.json`);

  const abundanceFileNames = [
    "crustAbundance",
    "humanAbundance",
    "meteoriteAbundance",
    "oceanAbundance",
    "solarAbundance",
    "universeAbundance"
  ].map(fileName => `${dirname}/wolfram-data-groups/5-abundance-properties/${fileName}.json`);

  atomArrayExtract(propertiesRootFileNames, {
    "Abundance": abundanceFileNames
  })
    .then(finalJson => {
      return outputFile(`${dirname}/${outputFolder}/atomTabProperties.json`, finalJson);
    })
    .catch(e => {
      console.log(e);
    });
}

// ELECTRONS TAB
{
  const electronTabRootFilenames = [
    "1-basic-atom-properties/atomicNumber",
    "1-basic-atom-properties/atomicWeight"
  ].map(fileName => `${dirname}/wolfram-data-groups/${fileName}.json`);

  const radiusFileNames = [
    "9-atomic-properties/atomicRadius",
    "9-atomic-properties/covalentRadius",
    "2-material-properties/soundSpeed",
    "2-material-properties/thermalConductivity"
  ].map(fileName => `${dirname}/wolfram-data-groups/${fileName}.json`);

  atomArrayExtract(electronTabRootFilenames, {
    "Radius": radiusFileNames
  })
    .then(finalJson => {
      return outputFile(`${dirname}/${outputFolder}/atomTabElectrons.json`, finalJson);
    })
    .catch(e => {
      console.log(e);
    });
}
