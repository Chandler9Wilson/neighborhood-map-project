var gulp        = require('gulp');
var browsersync = require('browser-sync');

var dev = browsersync.create('dev');

gulp.task('browsersync', [], function() {
    dev.init({
        server: {
            baseDir: ['./src']
        },
        port: 9999,
        files: [
            'src/css/*.css',
            'src/js/*.js',
            'src/images/**'
        ]
    });
});