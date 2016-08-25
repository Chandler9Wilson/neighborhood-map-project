var gulp = require('gulp');
var config = require('../../config').development.watch;

//Start browsersync task and then watch files for changes
gulp.task('watch', ['browsersync'], function() {
    gulp.watch(config.scripts, ['lint-watch']);
    gulp.watch(config.styles, ['styles-watch']);
    gulp.watch(config.html, ['html-watch']);
});