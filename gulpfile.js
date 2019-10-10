import { dest, src } from "gulp";
import flatten from "gulp-flatten";
import jsonminify from "gulp-jsonminify";
import del from "del";

import { removeDebug } from "./helper.gulpfile";

async function transferWolfram() {
  const from = ["wolfram/output/*.json", "wolfram/atom-layout-data/*.json"];
  const to = "backend/public/data";
  
  del([to + "/**", "!" + to])
    .then(() => {
      src(from)
        .pipe(flatten())
        .pipe(removeDebug())
        .pipe(jsonminify())
        .pipe(dest(to));
    })
    .catch(e => {
      console.error(e)
    });
}

async function transferFrontend() {
  const from = "frontend/dist/{*.js,*.css,*.html,assets/*}";
  const to = "backend/public";

  del(["backend/public/**", "!backend/public/", "!backend/public/data"])
    .then(() => {
      src(from)
        .pipe(dest(to));
    })
    .catch(e => {
      console.error(e)
    });
}

export { transferWolfram, transferFrontend }
