var gulp = require('gulp');
var jsonminify = require('gulp-jsonminify');
var gzip = require('gulp-gzip');
var brotli = require('gulp-brotli');

gulp.task('deploy-html', function() {
  gulp.src('./dist/index.html')
  .pipe(gulp.dest('../backend'));
});

gulp.task('deploy-json', function() {
  // Pipe uncompressed and compressed assets
  gulp.src('../computed/*.json')
  .pipe(gulp.dest('../backend/uncompressed-assets/data'))
  .pipe(jsonminify())
  .pipe(gulp.dest('../backend/assets/data'));

  // Pipe compressed, then gziped assets
  gulp.src('../computed/*.json')
  .pipe(gzip())
  .pipe(gulp.dest('../backend/assets/data'));

  // Pipe compressed, then brotlized assets
  gulp.src('../computed/*.json')
  .pipe(brotli.compress())
  .pipe(gulp.dest('../backend/assets/data'));
});
