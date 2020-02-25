import fs from "fs";
import path from "path";
import test from "ava";

[
  'atomColorsTabProperties.json',
  'atomColorsTabElectrons.json',
  'atomPlacements.json'
].forEach(file => {
  const filePath = path.resolve(__dirname, "../build/atom-layout-data", file);
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
