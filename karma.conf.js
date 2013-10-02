// Karma configuration
// Generated on Tue Sep 10 2013 18:12:14 GMT+0200 (CEST)

var conf = require('./files.conf.js');

module.exports = function(config) {

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        files: conf.testFilesDev,

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

        browserStack: {
            username: process.env.BROWSER_STACK_USERNAME,
            accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
            startTunnel: true,
            captureTimeout: 90000,
            retryLimit: 10
        },

        sauceLabs: {

            startConnect: false,

            testName: 'Stimuli Unit Tests',

            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER

        },

        customLaunchers: {

            'Android - 2.3': {
                base: 'AndroidVBox',
                vm: 'Android 2.3',
                natForwardingPort: 54321
            },

            'Android - 3.2': {
                base: 'AndroidVBox',
                vm: 'Android 3.2',
                natForwardingPort: 54322
            },

            'Android - 4.0': {
                base: 'AndroidVBox',
                vm: 'Android 4.0',
                natForwardingPort: 54323
            },

            'Android - 4.2': {
                base: 'AndroidVBox',
                vm: 'Android 4.2',
                natForwardingPort: 54324
            },

            'Android - 4.3': {
                base: 'AndroidVBox',
                vm: 'Android 4.3',
                natForwardingPort: 54325
            },

            'SL_Chrome': {
                base: 'SauceLabs',
                browserName: 'chrome',
                platform: 'Windows 7'
            },

            'SL_Firefox': {
                base: 'SauceLabs',
                browserName: 'firefox',
                platform: 'Windows 7',
                version: '23'

            },

            'SL_Safari': {
                base: 'SauceLabs',
                browserName: 'safari',
                platform: 'Mac 10.8',
                version: '6'
            },

            'SL_IE8': {
                base: 'SauceLabs',
                browserName: 'internet explorer',
                platform: 'Windows 7',
                version: '8'
            },

            'SL_IE9': {
                base: 'SauceLabs',
                browserName: 'internet explorer',
                platform: 'Windows 7',
                version: '9'
            },

            'SL_IE10': {
                base: 'SauceLabs',
                browserName: 'internet explorer',
                platform: 'Windows 8',
                version: '10'
            },

            SL_IOS6: {
                base: 'SauceLabs',
                browserName: 'iphone',
                platform: 'OS X 10.8',
                version: '6'
            },

            SL_ANDROID4: {
                base: 'SauceLabs',
                browserName: 'android',
                platform: 'Linux',
                version: '4.0'
            },

            BS_FIREFOX: {
                base: 'BrowserStack',
                browser: 'firefox',
                browser_version: '24.0',
                os: 'Windows',
                os_version: '7'
            },

            BS_CHROME: {
                base: 'BrowserStack',
                browser: 'chrome',
                browser_version: '29.0',
                os: 'Windows',
                os_version: '7'
            },

            BS_IE8: {
                base: 'BrowserStack',
                browser: 'ie',
                browser_version: '8.0',
                os: 'Windows',
                os_version: '7'
            },

            BS_IE9: {
                base: 'BrowserStack',
                browser: 'ie',
                browser_version: '9.0',
                os: 'Windows',
                os_version: '7'
            },

            BS_IE10: {
                base: 'BrowserStack',
                browser: 'ie',
                browser_version: '10.0',
                os: 'Windows',
                os_version: '7'
            },

            BS_IE11: {
                base: 'BrowserStack',
                browser: 'ie',
                browser_version: '11.0',
                os: 'Windows',
                os_version: '7'
            },

            BS_SAFARI6: {
                base: 'BrowserStack',
                browser: 'safari',
                browser_version: '6.0',
                os: 'OS X',
                os_version: 'Mountain Lion'
            },

            BS_OPERA15: {
                base: 'BrowserStack',
                os: 'Windows',
                browser: 'opera',
                os_version: '7',
                browser_version: '15.0'
            },

            BS_ANDROID_4: {
                base: 'BrowserStack',
                os: 'android',
                device: 'Samsung Galaxy Tab 2 10.1',
                browser: 'Android Browser',
                os_version: '4.0',
                browser_version: null
            },

            BS_ANDROID_41: {
                base: 'BrowserStack',
                os: 'android',
                device: 'Samsung Galaxy Note II',
                browser: 'Android Browser',
                os_version: '4.1',
                browser_version: null
            },

            BS_IOS_6: {
                base: 'BrowserStack',
                os: 'ios',
                device: 'iPad 3rd (6.0)',
                browser: 'Mobile Safari',
                os_version: '6.0',
                browser_version: null
            }



        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        reportSlowerThan: 10000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        transports: ['websocket', 'xhr-polling']  // (flashsockets are buggy on ie8-9)

    });
};
