var gulp = require('gulp');

gulp.task('deploy', function() {
  gulp.src('./dist/index.html')
  .pipe(gulp.dest('../backend'))
});