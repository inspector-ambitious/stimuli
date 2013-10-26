'use strict';
var files = require('./files.conf.js');
var conf = require('./karma.shared.conf.js');
module.exports = function(config) {

    conf.files = files.testFilesDev;

    conf.singleRun = true;
    conf.logLevel = config.LOG_INFO;
    conf.disableCompression = true;
    conf.reporters = ['dots', 'coverage'];
    conf.coverageReporter = {
        type: 'lcovonly',
        dir: 'coverage/'
    };
    conf.preprocessors =  {
        '**/src/**/*.js': ['coverage']
    };

    config.set(conf);

};
