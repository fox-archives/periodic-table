import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { atomArrayExtract } from "./helper.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// PROPERTIES TAB
{
  let propertiesRootFileNames = [
    "basic-atom-properties/atomicNumber",
    "basic-atom-properties/atomicWeight",
    "atomic-properties/atomicRadius",
    "material-properties/density"
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
      promisify(fs.writeFile)(`${dirname}/abundance.json`, JSON.stringify(finalJson, null, 2))
        .then(() => {
          console.log("file saved");
        })
    })
}
