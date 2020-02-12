import through from "through2";
import PluginError from "plugin-error";

export function removeDebug() {
  return through.obj((file, enc, cb) => {
    let content = String(file.contents);

    let json;
    try {
      json = JSON.parse(content).data;
    }
    catch(e) {
      return cb(new PluginError("helper.gulpfile.js", "could not parse JSON file", {
        fileName: file.path,
        showStack: true
      }));
    }

    if(!json.data) return cb(null, file);
    console.log("removeDebug: processed", file.path);
    json.data.forEach(atomData => {
      if(atomData.debug) {
        delete atomData.debug;
      }

      Object.keys(atomData).forEach(atomDataProperty => {
        if(typeof atomData[atomDataProperty] !== 'object') return;

        if(atomData[atomDataProperty].debug) {
          delete atomData[atomDataProperty].debug
        }
      })
    });

    file.contents = new Buffer.from(JSON.stringify(json, null, 2));
    return cb(null, file);
  });
}
