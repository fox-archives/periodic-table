import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";
import { promisify as pwomisify } from "util";
import { atomArrayExtract } from "./helper.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(dirname, "..");

// PROPERTIES TAB
{
  let abundanceFileNames = [
    "crustAbundance",
    "humanAbundance",
    "meteoriteAbundance",
    "oceanAbundance",
    "solarAbundance",
    "universeAbundance"
  ].map(fileName => `${rootDir}/wolfram-data-groups/abundance-properties/${fileName}.json`);

  atomArrayExtract(abundanceFileNames)
    .then(finalJson => {
      pwomisify(fs.writeFile)(`${dirname}/abundance.json`, JSON.stringify(finalJson, null, 2))
        .then(() => {
          console.log("file saved");
        })
    })
}
