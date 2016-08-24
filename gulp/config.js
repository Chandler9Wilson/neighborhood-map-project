var devAssets = 'src';
var devScripts = 'src/js/**/*.js';
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
            scripts: {devScripts},
            styles: {}
        },
        lint: {
            src: devScripts
        }
    }
}