import fs from "fs";
import { promisify } from "util";

/*
  fileNames
    fileNames, corresponding to specific atom properties
  subFileNames
    same as fileNames, but these are shown not at root, but in a sub object of toAtomObject
*/
function atomArrayExtract(fileNames, subFileNames) {
  let final = {
    data: Array.apply(null, Array(120)).map(() => ({ debug: {} }))
  };
  let promises = [];

  fileNames.forEach(fileName => {
    let promise = promisify(fs.readFile)(fileName, "utf8")
      .then(fileData => {
        let json = JSON.parse(fileData);

        json.data.forEach((fromAtomObject, i) => {
          const atomProperty = json.meta.atomPropertyNameWithSpace;

          let toAtomObject = final.data[i];

          toAtomObject.debug[atomProperty] = fromAtomObject.name;
          toAtomObject[atomProperty] = fromAtomObject.value;
        });
      })
      .catch(e => {
        console.log(e);
      });

    promises.push(promise);
  });

  return Promise.all(promises)
    .then(() => {
      // add properties to each atom in final.data (each from subFileNames)
      final.data.forEach((atomData, i, arr) => {
        Object.keys(subFileNames).forEach(key => {
          arr[i][key] = {};
          arr[i][key].debug = {};
        });
      });
      let subPromises = [];

      Object.keys(subFileNames).forEach(key => {
        subFileNames[key].forEach(subFileName => {
          let promise = promisify(fs.readFile)(subFileName, "utf8")
            .then((subFileData) => {
              let json = JSON.parse(subFileData);

              json.data.forEach((fromAtomObject, i) => {
                const atomProperty = json.meta.atomPropertyNameWithSpace;

                let toAtomObject = final.data[i];

                toAtomObject[key].debug[atomProperty] = fromAtomObject.name;
                toAtomObject[key][atomProperty] = fromAtomObject.value;
              });
            })
            .catch(e => {
              console.log(e);
            });

          subPromises.push(promise);
        });
      });

      return Promise.all(subPromises)
        .then(() => final)
        .catch(e => {
          console.log(e);
        });
    })
    .catch(e => {
      console.log(e);
    });
}

export { atomArrayExtract };
