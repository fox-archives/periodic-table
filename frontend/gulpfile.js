var gulp = require('gulp');

gulp.task('deploy', function() {
  gulp.src('./dist/index.html')
  .pipe(gulp.dest('../backend'))
});

gulp.task('copy-json', function() {
  gulp.src('../computed/simple.json')
  .pipe(gulp.dest('../backend'))
});
