import { dest, src } from 'gulp'
import plumber from 'gulp-plumber'
import flatten from 'gulp-flatten'
import jsonminify from 'gulp-jsonminify'
import del from 'del'

import { removeDebug } from './helper.gulpfile'

async function buildDist() {
  const from = [
    'build/atom-layout-data/*.json',
    'build/atom-tab-data/*.json'
  ]

  const to = 'dist'

  del.sync([to + '/**', '!' + to])
  src(from)
    .pipe(plumber())
    .pipe(flatten())
    .pipe(removeDebug())
    .pipe(jsonminify())
    .pipe(dest(to))
}

export { buildDist }
