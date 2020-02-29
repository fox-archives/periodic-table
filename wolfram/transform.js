import path from "path";
import fs from "fs";

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
    "3-thermodynamic-properties/meltingPoint",
    "2-material-properties/bulkModulus",
    "2-material-properties/soundSpeed",
    "2-material-properties/thermalConductivity",
    "2-material-properties/thermalExpansion",
    "3-thermodynamic-properties/criticalPressure",
    "3-thermodynamic-properties/criticalTemperature",
    "3-thermodynamic-properties/fusionHeat",
    "3-thermodynamic-properties/specificHeat",
    "3-thermodynamic-properties/vaporizationHeat"
  ].map(fileName => `${dirname}/wolfram-data-groups/${fileName}.json`);

  const abundanceFileNames = [
    "crustAbundance",
    "humanAbundance",
    "meteoriteAbundance",
    "oceanAbundance",
    "solarAbundance",
    "universeAbundance"
  ].map(
    fileName =>
      `${dirname}/wolfram-data-groups/5-abundance-properties/${fileName}.json`
  );

  atomArrayExtract(propertiesRootFileNames, {
    Abundance: abundanceFileNames
  })
    .then(finalJson => {
      return outputFile(
        `${dirname}/${outputFolder}/atomTabProperties.json`,
        finalJson
      );
    })
    .catch(e => {
      console.error(e);
    });
}

// ELECTRONS TAB
{
  const electronTabRootFilenames = [
    "1-basic-atom-properties/atomicNumber",
    "1-basic-atom-properties/atomicWeight",
    "2-material-properties/soundSpeed",
    "2-material-properties/thermalConductivity"
  ].map(fileName => `${dirname}/wolfram-data-groups/${fileName}.json`);

  const radiusFileNames = [
    "9-atomic-properties/atomicRadius",
    "9-atomic-properties/covalentRadius",
    "9-atomic-properties/vanDerWaalsRadius"
  ].map(fileName => `${dirname}/wolfram-data-groups/${fileName}.json`);

  atomArrayExtract(electronTabRootFilenames, {
    Radius: radiusFileNames
  })
    .then(finalJson => {
      return outputFile(
        `${dirname}/${outputFolder}/atomTabElectrons.json`,
        finalJson
      );
    })
    .catch(e => {
      console.error(e);
    });
}

// GRAPHQL
{
  new Promise(async (resolve, reject) => {
    const wolframDataGroupDirs = (
      await fs.promises.readdir("wolfram-data-groups", {
        withFileTypes: true
      })
    )
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const promises = [];
    for (const dir of wolframDataGroupDirs) {
      const fullDir = path.join("wolfram-data-groups", dir);
      const promise = fs.promises.readdir(fullDir, {
        withFileTypes: true
      });
      promises.push({
        fullDir, promise
      });
    }
    const arrayOfArrayOfDirents = await Promise.all(promises.map(obj => obj.promise));
    const arrayOfArrayOfFiles = [];
    for (let i = 0; i < arrayOfArrayOfDirents.length; ++i) {
      const newArray = arrayOfArrayOfDirents[i]
        .filter(dirent => dirent.isFile())
        .map(dirent => path.join(promises[i].fullDir, dirent.name))
        .filter(dirent => dirent.includes(".json"));
      arrayOfArrayOfFiles.push(newArray)
    }
    let jsonFiles = arrayOfArrayOfFiles.flat()
    resolve(jsonFiles)
  })
    .then(allFilenames => {
      const electronTabRootFilenames = allFilenames.map(
        fileName => `${dirname}/wolfram-data-groups/${fileName}.json`
      );

      const radiusFileNames = [
        "9-atomic-properties/atomicRadius",
        "9-atomic-properties/covalentRadius",
        "9-atomic-properties/vanDerWaalsRadius"
      ].map(fileName => `${dirname}/wolfram-data-groups/${fileName}.json`);

      return atomArrayExtract(allFilenames, {
        Radius: radiusFileNames
      });
    })
    .then(finalJson => {
      return outputFile(
        `${dirname}/${outputFolder}/atomGraphql.json`,
        finalJson
      );
    })
    .catch(err => {
      console.error(err);
    });
}
