'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
      
    jshint: {
        
      files: [
          
        'Gruntfile.js',
        'src/**/*.js',
        'package.json',
        '.jshintrc',
        'test/**/*.js'
        
      ],
      
      options: {
        jshintrc: '.jshintrc'
      }
      
    },
    
    jsdoc: {
        

        dist : {
            src: ['src/**/*.js'],
            
            options: {
                destination: 'docs'
            }
        }
   
        
    },

    karma: {
        
        watcha: {
            configFile: 'karma.conf.js',
            singleRun: false,
            autoWatch: true,
            browsers: ['Firefox', 'PhantomJS', 'Chrome', 'Safari', 'IE8 - WinXP', 'IE9 - Win7', 'IE10 - Win7'],
        },

        coverage: {
            configFile: 'karma.conf.js',
            browsers: ['Chrome'],
            reporters: ['coverage']
        },

        sauce1: {
            configFile: 'karma.conf.js',
            browsers: ['SL_Chrome', 'SL_Firefox', 'PhantomJS']
        },
        
        sauce2: {
            configFile: 'karma.conf.js',
            browsers: ['SL_Safari', 'SL_IE_8']
        },
        
        sauce3: {
            configFile: 'karma.conf.js',
            browsers: ['SL_IE_9', 'SL_IE_10']
        }
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-karma');

  grunt.loadNpmTasks('grunt-jsdoc');
  
  grunt.registerTask('testwatcha', ['karma:watcha']);
  grunt.registerTask('testcoverage', ['karma:coverage']);
};