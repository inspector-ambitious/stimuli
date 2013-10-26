'use strict';
var files = require('./files.conf.js');
var conf = require('./karma.shared.conf.js');
module.exports = function(config) {

    conf.files = files.testFilesDev;


    conf.reporters = ['minimalist', 'coverage'];
    conf.coverageReporter = {
        type: 'lcovonly',
        dir: 'coverage/'
    };
    conf.preprocessors =  {
        '**/src/**/*.js': ['coverage']
    };

    conf.logLevel = config.LOG_INFO;
    conf.autoWatch = false;
    conf.singleRun = true;
    conf.disableCompression = true;

    config.set(conf);

};
