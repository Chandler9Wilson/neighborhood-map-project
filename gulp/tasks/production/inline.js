/*var gulp = require('gulp');
var critical = require('critical');

gulp.task('critical', function (cb) {
    critical.generate({
        inline: true,
        base: 'dist/',
        src: 'index.html',
        dest: 'dist/index.html',
        minify: true,
        width: 320,
        height: 480
    });
});*/

var gulp = require('gulp');
var critical = require('critical').stream;

gulp.task('critical-views', function () {
    return gulp.src('dist/views/*.html')
        .pipe(critical({base: 'dist/views', inline: true, minify: true}))
        .pipe(gulp.dest('dist/views'));
});

// Generate & Inline Critical-path CSS 
gulp.task('critical', ['critical-views'], function () {
    return gulp.src('dist/*.html')
        .pipe(critical({base: 'dist/', inline: true, minify: true}))
        .pipe(gulp.dest('dist'));
});