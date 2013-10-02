// Karma configuration
// Generated on Tue Sep 10 2013 18:12:14 GMT+0200 (CEST)

var files = require('./files.conf.js');
var conf = require('./karma.shared.conf.js');
module.exports = function(config) {

    conf.files = files.testFilesDev;
    conf.autoWatch = true;
    conf.singleRun = false;
    conf.logLevel = config.LOG_INFO;
    config.set(conf);

};
