// Karma configuration
// Generated on Tue Sep 10 2013 18:12:14 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['mocha', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
        
      'node_modules/expect.js/expect.js',
      
      {pattern: 'src/**/*.js', included: false},
      
      {pattern: 'test/unit/**/*.js', included: false},
      
      'test/unit.js'
      
    ],


    // list of files to exclude
    exclude: [
      
    ],

    preprocessors: {
        'src/**/*.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    sauceLabs: {
                 
        startConnect: false,
        
        testName: 'Domino Unit Tests',
        
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
        
    },


    customLaunchers: {
        
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome'
      },
      
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox'
      },
      
      'SL_Safari': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'Mac 10.8',
        version: '6'
      },
      
      'SL_IE_8': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '8'
      },
      
      'SL_IE_9': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2008',
        version: '9'
      },
      
      'SL_IE_10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2012',
        version: '10'
      }
      
    },
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['SL_Chrome', 'SL_Firefox', 'SL_Safari', 'SL_IE_8', 'SL_IE_9', 'SL_IE_10', 'PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    
    reportSlowerThan: 500
    
  });
};
