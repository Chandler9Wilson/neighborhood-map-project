var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

gulp.task('optimize-views', function() {
    return gulp.src(['dist/views/*.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/views'))
});

// Minify HTML in main src folder
gulp.task('optimize-html', ['optimize-views'], function() {
    return gulp.src(['dist/*.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});