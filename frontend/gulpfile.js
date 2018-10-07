var gulp = require('gulp');
var jsonminify = require('gulp-jsonminify');
var gzip = require('gulp-gzip');
var brotli = require('gulp-brotli');

const inDir = '../computed/json/*.json';
const outDir = '../backend/public/element-data';

gulp.task('deploy-html', function() {
  gulp.src('./dist/index.html')
  .pipe(gulp.dest('../backend'));
});

// TODO: Clear out files before copying new ones over
gulp.task('deploy-json', function() {
  // Pipe uncompressed and compressed assets
  gulp.src(inDir)
  .pipe(jsonminify())
  .pipe(gulp.dest(outDir));

  // Pipe compressed, then gziped assets
  gulp.src(inDir)
  .pipe(jsonminify())
  .pipe(gzip())
  .pipe(gulp.dest(outDir));

  // Pipe compressed, then brotlized assets
  gulp.src(inDir)
  .pipe(jsonminify())
  .pipe(brotli.compress())
  .pipe(gulp.dest(outDir));
});
