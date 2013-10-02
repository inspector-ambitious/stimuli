'use strict';
// Karma configuration
// Generated on Tue Sep 10 2013 18:12:14 GMT+0200 (CEST)

var files = require('./files.conf.js');
var conf = require('./karma.shared.conf.js');
module.exports = function(config) {

    conf.files = files.testFilesBuild;

    conf.browserStack = {
        username: process.env.BROWSER_STACK_USERNAME,
        accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
        startTunnel: true,
        captureTimeout: 180000, // 3 mins
        retryLimit: 8
    };
    conf.logLevel = config.LOG_INFO;
    conf.customLaunchers = {

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

        BS_SAFARI51: {
            base: 'BrowserStack',
                browser: 'safari',
                browser_version: '5.1',
                os: 'OS X',
                os_version: 'Snow Leopard'
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

        BS_ANDROID_23: {
            base: 'BrowserStack',
                os: 'android',
                device: 'Samsung Galaxy S II',
                browser: 'Android Browser',
                os_version: '2.3',
                browser_version: null
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

        BS_ANDROID_42: {
            base: 'BrowserStack',
                os: 'android',
                device: 'LG Nexus 4',
                browser: 'Android Browser',
                os_version: '4.2',
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

    };
    conf.autoWatch = false;
    conf.singleRun = true;
    config.set(conf);

};
