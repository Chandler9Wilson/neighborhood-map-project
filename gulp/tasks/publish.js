var gulp = require('gulp');
var runSequence = require('run-sequence');
var site = '';

gulp.task('publish', ['build:production'], function(callback) {
    runSequence(
        'browsersync:production',
        'ngrok-url',
        'psi-desktop',
        'psi-mobile',
        callback);
});