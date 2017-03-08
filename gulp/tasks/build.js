var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', ['build:production'], function(callback) {
    runSequence(
        'browsersync:production',
        callback);
});