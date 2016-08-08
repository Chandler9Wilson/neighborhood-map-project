var gulp = require('gulp');
var del = require('del');

// Cleans dist by deleting all files in dist excluding both img folders
gulp.task('clean', function() {
    return del(['dist/**', 'dist/views/**', '!dist', '!dist/img', '!dist/img/**', '!dist/views', '!dist/views/images', '!dist/views/images/**']);
});