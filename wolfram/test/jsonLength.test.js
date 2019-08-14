import fs from "fs";
import test from "ava";
import { promisify } from "util";

let filenames = [
  'atom-colors/atomColorsCategory.json',
  'atom-colors/atomColorsOrbitalBlock.json',
  'atom-placement/atomPlacement.json',
  'atom-tab-all/atomTabAll.json',
  'atom-tab-isotopes/atomTabIsotopes.json',
  'atom-tab-properties/atomTabProperties.json'
];

filenames.forEach(file => {
  let filePath = `../wolfram/${file}`;
  test(`test length of ${filePath} to equal 120`, t => {
    return promisify(fs.readFile)(filePath)
      .then(text => {
        let json = JSON.parse(text);
        t.is(json.length, 120);
      })
      .catch(e => {
        console.log(e);
      });
  });
});

