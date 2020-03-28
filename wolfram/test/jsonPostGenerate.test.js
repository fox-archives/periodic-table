import fs from "fs";
import path from "path";
import test from "ava";

[
  'atom-layout-data/atomColorsTabProperties.json',
  'atom-layout-data/atomColorsTabElectrons.json',
  'atom-layout-data/atomPlacements.json',
  'atom-tab-data/atomTabElectrons.json',
  'atom-tab-data/atomTabProperties.json'
].forEach(file => {
  const filePath = path.resolve(__dirname, "../build", file);
  test(`length of atom-layout-data/${file} to equal 120`, async t => {
    try {
      const text = await fs.promises.readFile(filePath);
      const json = JSON.parse(text);
      
      t.is(json.data.length, 120);
    } catch (err) {
      console.error(err);
    }
  });
});

[
  "atom-tab-data/atomGraphql.json"
].forEach(file => {
  const filePath = path.resolve(__dirname, "../build", file);
  test(`length of atom-layout-data/${file} to equal 118`, async t => {
    try {
      const text = await fs.promises.readFile(filePath);
      const json = JSON.parse(text);

      t.is(json.data.length, 118);
    } catch (err) {
      console.error(err);
    }
  });
});
