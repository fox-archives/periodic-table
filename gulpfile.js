let path = require("path");

let { dest, src } = require("gulp");
let flatten = require("gulp-flatten");
let jsonminify = require("gulp-jsonminify");

let del = require("del");

async function transferComputed() {
  let from = "wolfram/**/*.json";
  let to = "backend/public/data";
  
  del([to + "/**", "!" + to])
    .then(() => {
      src(from)
        .pipe(flatten())
        .pipe(jsonminify())
        .pipe(dest(to))
    })
}

exports.transferComputed = transferComputed;
