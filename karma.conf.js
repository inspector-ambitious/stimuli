// Karma configuration
// Generated on Tue Sep 10 2013 18:12:14 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['mocha'],


    // list of files to exclude
    exclude: [
      
    ],


    preprocessors: {
        'src/**/*.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots'],

    coverageReporter: {
        type : 'html',
        dir : 'coverage/',
        type: 'lcov'
    },

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
      
      'SL_IE8': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '8'
      },
      
      'SL_IE9': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2008',
        version: '9'
      },
      
      'SL_IE10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2012',
        version: '10'
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
    captureTimeout: 30000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    
    reportSlowerThan: 500
    
  });
};
