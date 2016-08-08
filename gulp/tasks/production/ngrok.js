var gulp = require('gulp');
var ngrok = require('ngrok');
//var site = '';

// Allows a local server to tunnel to a public address
gulp.task('ngrok-url', function(cb) {  //cb = callback
    return ngrok.connect(9998, function (err, url) {
        site = url;
        console.log('serving your tunnel from: ' + site);
        cb();
    });
});