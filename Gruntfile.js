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
        
        unit: {
            configFile: 'karma.unit.conf.js'
        },
        
        sauce1: {
            configFile: 'karma.continuous.conf.js',
            browsers: ['SL_Chrome', 'SL_Firefox', 'PhantomJS']
        },
        
        sauce2: {
            configFile: 'karma.continuous.conf.js',
            browsers: ['SL_Safari', 'SL_IE_8']
        },
        
        sauce3: {
            configFile: 'karma.continuous.conf.js',
            browsers: ['SL_IE_9', 'SL_IE_10']
        }
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-karma');

  grunt.loadNpmTasks('grunt-jsdoc');
  
  grunt.registerTask('testwatch', ['karma:unit']);
};