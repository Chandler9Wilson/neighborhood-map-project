var gulp = require('gulp');
var config = require('../../config').development.watch;

//Start browsersync task and then watch files for changes


//All tasks within the Array will be executed before the task is executed.
gulp.task('watch', ['browsersync'], function() {
    gulp.watch(/*config.scripts*/'src/js/**/*.js', ['lint-watch'])
});