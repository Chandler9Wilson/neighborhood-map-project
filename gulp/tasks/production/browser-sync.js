var gulp        = require('gulp');
var browsersync = require('browser-sync');
var gzip = require('gulp-gzip');
var compress = require('compression');

var production = browsersync.create('production');

gulp.task('browsersync:production', function() {
    production.init({
        server: {
            baseDir: ['./dist'],
            middleware: [compress()]
        },
        port: 9998
    });
});