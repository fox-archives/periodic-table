import fs from "fs";

const DEBUG = false

function fixMissingQAndUnknownQ(value) {
  if (value === "MissingQ") {
    return "N/A";
  } else if (value === "UnknownQ") {
    return "Unknown"
  } else {
    return value;
  }
}
/*
  fileNames
    fileNames, corresponding to specific atom properties
  subFileNames
    same as fileNames, but these are shown not at root, but in a sub object of toAtomObject
*/
function atomArrayExtract(fileNames, subFileNames) {
  let finalJson = {
    data: DEBUG
      ? Array.apply(null, Array(120)).map(() => ({ debug: {} }))
      : Array.apply(null, Array(120)).map(() => ({ })),
    meta: {}
  };
  let promises = [];

  fileNames.forEach(fileName => {
    let promise = fs.promises.readFile(fileName, "utf8")
      .then(fileData => {
        let json;
        try {
          json = JSON.parse(fileData);        
        } catch {
          console.error('failed to json.parse ', fileName)
        }

        // add in 'meta'
        finalJson.meta[json.meta.atomPropertyNameWithSpace] = {
          unit: json.meta.unit,
          unitLong: json.meta.unitLong
        }

        // add properties to 'data'
        json.data.forEach((fromAtomObject, i) => {
          const atomProperty = json.meta.atomPropertyNameWithSpace;
          let toAtomObject = finalJson.data[i];

          if (DEBUG) toAtomObject.debug[atomProperty] = fromAtomObject.name;
          toAtomObject[atomProperty] = fixMissingQAndUnknownQ(fromAtomObject.value);

        });
      })
      .catch(err => {
        console.log(err);
      });

    promises.push(promise);
  });

  // now we are iterating over all the subFileNames
  finalJson.data.forEach((atomData, i, arr) => {
    Object.keys(subFileNames).forEach(key => {
      arr[i][key] = {};
      if(DEBUG) arr[i][key].debug = {};
    });
  });
  let subPromises = [];

  Object.keys(subFileNames).forEach(key => {
    subFileNames[key].forEach(subFileName => {
      let promise = fs.promises.readFile(subFileName, "utf8")
        .then((subFileData) => {
          let json = JSON.parse(subFileData);

          // add in 'meta'
          finalJson.meta[json.meta.atomPropertyNameWithSpace] = {
            unit: json.meta.unit,
            unitLong: json.meta.unitLong
          }

          // add properties to 'data'
          json.data.forEach((fromAtomObject, i) => {
            const atomProperty = json.meta.atomPropertyNameWithSpace;

            let toAtomObject = finalJson.data[i];

            if (DEBUG) toAtomObject[key].debug[atomProperty] = fromAtomObject.name;
            toAtomObject[key][atomProperty] = fixMissingQAndUnknownQ(fromAtomObject.value);
          });
        })
        .catch(err => {
          console.log(err);
        });

      subPromises.push(promise);
    });
  });

  return Promise.all([...promises, ...subPromises])
    .then(() => finalJson)
    .catch(err => {
      console.log(err);
    });
}

/*
  outputFile
    file to output-atom-tab-data json
*/
async function outputFile(fileName, finalJsonOutput) {
  try {
    await fs.promises.writeFile(fileName, JSON.stringify(finalJsonOutput, null, 2))
    let fileNameTruncated = fileName.slice(fileName.indexOf("/"));
    console.log(`${fileNameTruncated} file saved`);
  } catch (err) {
    console.log(err);
  }
}

export { atomArrayExtract, outputFile };
