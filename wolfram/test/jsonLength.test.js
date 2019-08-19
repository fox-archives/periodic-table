import fs from "fs";
import test from "ava";
import { promisify } from "util";

let filenames = [
  'atomLayoutColorsCategory.json',
  'atomLayoutColorsOrbitalBlock.json',
  'atomPlacement.json'
];

filenames.forEach(file => {
  let filePath = `../wolfram/atom-layout-data/${file}`;
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

