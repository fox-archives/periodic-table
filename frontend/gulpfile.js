let gulp = require('gulp');
let jsonminify = require('gulp-jsonminify');
let gzip = require('gulp-gzip');
let brotli = require('gulp-brotli');

let inDir = '../computed/json/*.json';
let outDir = '../backend/public/atom-data';

gulp.task('deploy-dist', function() {
  gulp.src('./dist/index.html').pipe(gulp.dest('../backend/dist'));

  gulp.src('./dist/bundle.js').pipe(gulp.dest('../backend/dist'));

  gulp.src('./dist/bundle.css').pipe(gulp.dest('../backend/dist'));

  gulp.src('./dist/assets/*').pipe(gulp.dest('../backend/public/assets'));
});

// TODO: Clear out files before copying new ones over
gulp.task('deploy-json', function() {
  // Pipe uncompressed and compressed assets
  gulp
    .src(inDir)
    .pipe(jsonminify())
    .pipe(gulp.dest(outDir));

  // Pipe compressed, then gziped assets
  gulp
    .src(inDir)
    .pipe(jsonminify())
    .pipe(gzip())
    .pipe(gulp.dest(outDir));

  // Pipe compressed, then brotlized assets
  gulp
    .src(inDir)
    .pipe(jsonminify())
    .pipe(brotli.compress())
    .pipe(gulp.dest(outDir));
});
