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

  // now we are iterating over all the subFileNames
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

  return Promise.all([...promises, ...subPromises])
    .then(() => final)
    .catch(e => {
      console.log(e);
    });
}

/*
  outputFile
    file to output json
*/
function outputFile(fileName, finalJson) {
  return promisify(fs.writeFile)(fileName, JSON.stringify(finalJson, null, 2))
    .then(() => {
      let fileNameTruncated = fileName.slice(fileName.indexOf("/"));
      console.log(`${fileNameTruncated} file saved`);
    })
    .catch(e => {
      console.log(e);
    });
}

export { atomArrayExtract, outputFile };