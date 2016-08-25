var gulp = require('gulp');
var csslint = require('gulp-csslint');
var config = require('../../config').development.lintCSS;

gulp.task('lintCSS', function() {
  gulp.src(config.src)
    .pipe(csslint())
    .pipe(csslint.formatter());
});
