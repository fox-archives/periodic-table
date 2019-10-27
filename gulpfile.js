import { dest, series, src } from "gulp";
import flatten from "gulp-flatten";
import jsonminify from "gulp-jsonminify";
import del from "del";

import { removeDebug } from "./helper.gulpfile";

async function transferWolfram() {
  const from = [
    "wolfram/output-atom-tab-data/*.json",
    "wolfram/output-atom-layout-data/*.json"
  ];
  const to = "backend/public/data/*";
  
  del.sync([to + "/**", "!" + to]);
  src(from)
    .pipe(flatten())
    .pipe(removeDebug())
    .pipe(jsonminify())
    .pipe(dest(to));
}

async function transferFrontend() {
  const from = "frontend/dist/{*.js,*.css,*.html,assets/*}";
  const to = "backend/public";

  del.sync(["backend/public/**", "!backend/public/", "!backend/public/data"]);
  src(from)
    .pipe(dest(to));
}

async function transferAll() {
  series(transferWolfram, transferFrontend);
}

export { transferWolfram, transferFrontend, transferAll }
