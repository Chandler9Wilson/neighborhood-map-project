var gulp        = require('gulp');
var browsersync = require('browser-sync');

var dev = browsersync.create('dev');

gulp.task('browsersync', [], function() {
    dev.init({
        server: ['./src/', './node_modules']
    });

    gulp.watch('src/*.html').on('change', browsersync.reload);
});