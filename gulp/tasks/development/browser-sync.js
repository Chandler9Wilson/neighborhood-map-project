var gulp        = require('gulp');
var browsersync = require('browser-sync').create('dev');
var config      = require('../../config').development.browsersync;

/*var dev = browsersync.create('dev');*/

gulp.task('browsersync', [], function() {
    browsersync.init(config);
});

gulp.task('lint-watch', ['lint'], function (done) {
    browsersync.reload();
    done();
});

/*gulp.task('browsersync', [], function() {
    dev.init({
        server: ['./src/']
    });

    gulp.watch('src/*.html').on('change', browsersync.reload);
});*/