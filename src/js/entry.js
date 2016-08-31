//this is the entry point for require.js and all of its associated configuration

requirejs.config({
    "baseUrl": "src/js",
    "paths": {
        'mdl': [
            'https://code.getmdl.io/1.1.3/material.min.js',
            '../lib/uncompressed-mdl/material.min.js'
        ],
        'knockout': [
            'http://ajax.aspnetcdn.com/ajax/knockout/knockout-3.3.0.js',
            /*'todo'*/

        ]
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);

require(['domReady!'], function (doc) {
    //This function is called once the DOM is ready,
    //notice the value for 'domReady!' is the current
    //document.
    ko.applyBindings(myViewModel);
});