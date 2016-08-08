var gulp = require('gulp')
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var gzip = require('gulp-gzip');

gulp.task('optimize-views', function () {
    return gulp.src('src/views/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        //.pipe(gzip())
        .pipe(gulp.dest('dist/views'));
});