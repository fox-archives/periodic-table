let fs = require('fs');

describe('wolfram', () => {
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
    test(`test length of ${filePath}`, cb => {
      fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        let json = JSON.parse(data);
        expect(json.length).toEqual(120);
        cb();
      });
    });
  });
});
