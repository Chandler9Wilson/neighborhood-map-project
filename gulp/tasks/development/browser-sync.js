var gulp        = require('gulp');
var browsersync = require('browser-sync').create('dev');
var config      = require('../../config').development.browsersync;

//initializes a dev branch of the server
gulp.task('browsersync', [], function() {
    browsersync.init(config);
});

//the rest of the tasks here are for reloads during development
//the reloads would not work in seperate files for some reason?
gulp.task('lint-watch', ['lint'], function (done) {
    browsersync.reload();
    done();
});

gulp.task('styles-watch', ['lintCSS'], function (done) {
    browsersync.reload();
    done();
});

gulp.task('html-watch', [], function (done) {
    browsersync.reload();
    done();
});