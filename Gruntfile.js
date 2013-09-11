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
        
        continuous: {
            configFile: 'karma.continuous.conf.js'

        }
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-karma');

  grunt.loadNpmTasks('grunt-jsdoc');
  
  grunt.registerTask('travis', ['jshint', 'karma:continuous']);

};