'use strict';
var files = require('./files.conf.js');
var conf = require('./karma.shared.conf.js');
module.exports = function(config) {

    conf.files = files.testFilesDev;


    conf.reporters = ['coverage'];

    conf.coverageReporter = {
        type: 'lcov',
        dir: 'tmp_coverage/'
    };

    conf.preprocessors =  {
        '**/src/**/*.js': ['coverage']
    };

    conf.browserStack = {
        username: process.env.BROWSER_STACK_USERNAME,
        accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
        project: process.env.TRAVIS_REPO_SLUG || 'stimuli@local',
        build: process.env.TRAVIS_BUILD_NUMBER,
        startTunnel: true,
        retryLimit: 5,
        timeout: 600
    };
    conf.captureTimeout = 90000; // 1 min 30
    conf.logLevel = config.LOG_INFO;
    conf.reportSlowerThan = 30000;
    conf.disconnectTolerance = 5;
    conf.autoWatch = false;
    conf.singleRun = true;
    conf.disableCompression = true;
    conf.serverPort = 9876;
    conf.serverHost = '127.0.0.1';
    conf.clientHost = '127.0.0.1';
    conf.clientPort = 8080;
    conf.transports = ['xhr-polling'];

    conf.customLaunchers = {

        BS_IE8: {
            base: 'BrowserStack',
            browser: 'ie',
            browser_version: '8.0',
            os: 'Windows',
            os_version: 'XP'
        },

        BS_IE10: {
            base: 'BrowserStack',
            browser: 'ie',
            browser_version: '10.0',
            os: 'Windows',
            os_version: '8'
        },

        BS_IE11: {
            base: 'BrowserStack',
            browser: 'ie',
            browser_version: '11.0',
            os: 'Windows',
            os_version: '7'
        },

        BS_ANDROID_4: {
            base: 'BrowserStack',
            os: 'android',
            device: 'Samsung Galaxy Nexus',
            browser: 'Android Browser',
            os_version: '4.0',
            browser_version: null
        },

        BS_IOS_7: {
            base: 'BrowserStack',
            os: 'ios',
            device: 'iPhone 5S',
            browser: 'Mobile Safari',
            os_version: '7.0',
            browser_version: null
        },

        BS_SAFARI6: {
            base: 'BrowserStack',
            browser: 'safari',
            browser_version: '6.0',
            os: 'OS X',
            os_version: 'Mountain Lion'
        }

    };
    config.set(conf);

};
