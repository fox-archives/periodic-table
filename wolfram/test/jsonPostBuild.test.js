import fs from "fs";
import path from "path";
import test from "ava";

[
  "atomTabElectrons.json",
  "atomTabProperties.json"
].forEach(jsonFile => {
      console.info('jsonfile', jsonFile);
      const filePath = path.resolve(__dirname, "../dist/", jsonFile);
      test(`MissingQ, UnknownQ is NOT in dist/${jsonFile}`, async t => {
        try {
          const text = await fs.promises.readFile(filePath);
          const json = JSON.parse(text);
          json.data.forEach(atom => {
            t.notRegex(JSON.stringify(atom), /(MissingQ|UnknownQ)/);
          })
        } catch (err) {
          console.error(err);
        }
      })
    })
