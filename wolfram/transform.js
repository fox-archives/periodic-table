import path from "path";
import { fileURLToPath } from "url";
import { atomArrayExtract, outputFile } from "./transform.helper.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const outputFolder = "build/atom-tab-data";

// PROPERTIES TAB
{
  let propertiesRootFileNames = [
    "basic-atom-properties/atomicNumber",
    "basic-atom-properties/atomicWeight",
    "material-properties/density",
    "thermodynamic-properties/boilingPoint",
    "thermodynamic-properties/meltingPoint"
  ].map(fileName => `${dirname}/wolfram-data-groups/${fileName}.json`);

  let abundanceFileNames = [
    "crustAbundance",
    "humanAbundance",
    "meteoriteAbundance",
    "oceanAbundance",
    "solarAbundance",
    "universeAbundance"
  ].map(fileName => `${dirname}/wolfram-data-groups/abundance-properties/${fileName}.json`);

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
  let electronTabRootFilenames = [
    "basic-atom-properties/atomicNumber",
    "basic-atom-properties/atomicWeight"
  ].map(fileName => `${dirname}/wolfram-data-groups/${fileName}.json`);

  let radiusFileNames = [
    "atomic-properties/atomicRadius",
    "atomic-properties/covalentRadius",
    "material-properties/soundSpeed",
    "material-properties/thermalConductivity"
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
