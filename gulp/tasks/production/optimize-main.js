var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var gzip = require('gulp-gzip');
var debug = require('gulp-debug');

gulp.task('optimize-main', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(debug({title: 'entry:'}))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
        .pipe(debug({title: 'exit:'}));
});