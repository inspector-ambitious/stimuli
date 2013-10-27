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
        project: process.env.TRAVIS_REPO_SLUG || 'stimuli@local',
        build: process.env.TRAVIS_BUILD_NUMBER,
        startTunnel: true,
        retryLimit: 5,
        timeout: 600
    };
    conf.captureTimeout = 90000; // 1 min 30
    conf.logLevel = config.LOG_DEBUG;
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

        BS_FIREFOX: {
            base: 'BrowserStack',
            browser: 'firefox',
            browser_version: '24.0',
            os: 'Windows',
            os_version: 'XP'
        },

        BS_CHROME: {
            base: 'BrowserStack',
            browser: 'chrome',
            browser_version: '29.0',
            os: 'Windows',
            os_version: 'XP'
        },

        BS_IE8: {
            base: 'BrowserStack',
            browser: 'ie',
            browser_version: '8.0',
            os: 'Windows',
            os_version: 'XP'
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
            os_version: '8'
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

        BS_OPERA16: {
            base: 'BrowserStack',
            os: 'OS X',
            browser: 'opera',
            os_version: 'Mountain Lion',
            browser_version: '16.0'
        },


        BS_ANDROID_4: {
            base: 'BrowserStack',
            os: 'android',
            device: 'Samsung Galaxy Nexus',
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

        BS_IOS_7: {
            base: 'BrowserStack',
            os: 'ios',
            device: 'iPhone 5S',
            browser: 'Mobile Safari',
            os_version: '7.0',
            browser_version: null
        }

    };

    config.set(conf);

};
