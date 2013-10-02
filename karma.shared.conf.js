'use strict';

module.exports = {
    // base path, that will be used to resolve files and exclude
    basePath: '',



    // frameworks to use
    frameworks: ['mocha'],


    // list of files to exclude
    exclude: [],

    preprocessors: {
        '**/src/**/*.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots'],

    coverageReporter: {
        type: 'lcovonly',
        dir : 'coverage/'

    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    reportSlowerThan: 10000,



    transports: ['websocket', 'xhr-polling'],  // (flashsockets are buggy on ie8-9)
};