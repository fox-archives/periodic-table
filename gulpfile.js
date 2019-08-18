let path = require("path");

let { dest, src } = require("gulp");
let flatten = require("gulp-flatten");
let jsonminify = require("gulp-jsonminify");
let htmlmin = require('gulp-htmlmin');

let del = require("del");

let removeDebug = require("./helper.gulpfile");

async function transferWolfram() {
  let from = ["wolfram/atom-property-data/*.json", "wolfram/atom-layout-data/*.json"];
  let to = "backend/public/data";
  
  del([to + "/**", "!" + to])
    .then(() => {
      src(from)
        .pipe(flatten())
        .pipe(removeDebug())
        .pipe(jsonminify())
        .pipe(dest(to));
    })
    .catch(e => console.error(e));
}

async function transferFrontend() {
  let from = "frontend/index.html";
  let to = "backend";

  del(to + '/index.html')
    .then(() => {
      src(from)
        .pipe(htmlmin())
        .pipe(dest(to));
    })
    .catch(e => console.error(e));
}

exports.transferWolfram = transferWolfram;
exports.transferFrontend = transferFrontend;
