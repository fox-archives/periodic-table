import { dest, src } from "gulp"
import plumber from "gulp-plumber"
import flatten from "gulp-flatten"
import jsonminify from "gulp-jsonminify"
import del from "del"

import { removeDebug } from "./gulpfile.helper"

async function makeDist() {
  const from = "build/atom-*-data/*.json"
  const to = "dist"

  await del([to + "/**", "!" + to])
  src(from)
    .pipe(plumber())
    .pipe(flatten())
    .pipe(removeDebug())
    .pipe(jsonminify())
    .pipe(dest(to))
}

export { makeDist }
