var devAssets = 'src';
var devScripts = 'src/js/**/*.js';
var devStyles = 'src/css/**/*.css';
var devHTML = 'src/**/*.html';
var development = '';

module.exports = {
    development: {
        browsersync: {
            server: {
                baseDir: [devAssets]
            },
            port: 9999
        },
        watch: {
            scripts: devScripts,
            styles: devStyles,
            html: devHTML
        },
        lint: {
            src: devScripts
        },
        lintCSS: {
            src: devStyles
        }
    }
}