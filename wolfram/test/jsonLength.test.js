import fs from "fs";
import path from "path";
import test from "ava";
import { promisify } from "util";

let filenames = [
  'atomColorsTabProperties.json',
  'atomColorsTabElectrons.json',
  'atomPlacements.json'
];

filenames.forEach(file => {
  const filePath = path.resolve(__dirname, "../atom-layout-data", file);
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

