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
            configFile: 'karma.conf.js'
        },
        
        continuous: {
            configFile: 'karma.conf.js',
            singleRun: true,
            reporters: ['progress'],
            browsers: ['PhantomJS', 'Firefox']
        }
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-karma');

  grunt.loadNpmTasks('grunt-jsdoc');
  
  grunt.registerTask('travis', ['jshint', 'karma:continuous']);

};