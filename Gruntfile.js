'use strict';

// DominoFiles
var dominoFiles = [
    'src/domino.js',
    'src/utils/object.js',
    'src/mixins/observable.js',
    'src/utils/scheduler.js',
];

var karmaFiles = [

  {pattern: 'node_modules/expect.js/expect.js', watched: false},

  {pattern: 'node_modules/sinon/pkg/sinon.js', watched: false},

  {pattern: 'node_modules/sinon/pkg/sinon-ie.js', watched: false}

];

dominoFiles.forEach(function(dominoFile) {
  karmaFiles.push({pattern: dominoFile});
});

karmaFiles.push({pattern: 'test/unit/**/*.js'});

module.exports = function (grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

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
            
            files: karmaFiles,

            browsers: ['Firefox', 'PhantomJS', 'Chrome', 'Safari', 'IE8 - WinXP', 'IE9 - Win7', 'IE10 - Win7'],

        },

        coverage: {
            configFile: 'karma.conf.js',
            files: karmaFiles,
            browsers: ['PhantomJS'],
            reporters: ['coverage']
        },

        phantomjsci: {
            configFile: 'karma.conf.js',
            browsers: ['PhantomJS']
        },
        
        chromeci: {
            configFile: 'karma.conf.js',
            browsers: ['SL_Chrome']
        },

        firefoxci: {
            configFile: 'karma.conf.js',
            browsers: ['SL_Firefox']
        },

        safarici: {
            configFile: 'karma.conf.js',
            browsers: ['SL_Safari']
        },
        
        ie8ci: {
            configFile: 'karma.conf.js',
            browsers: ['SL_IE8']
        },

        ie9ci: {
            configFile: 'karma.conf.js',
            browsers: ['SL_IE9']
        },

        ie10ci: {
            configFile: 'karma.conf.js',
            browsers: ['SL_IE10']
        }
    },

    concat: {

        options: {
            stripBanners: true,

            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
                    '\'use strict\';\n',

            process: function(src, filepath) {
                return '\n// Source: ' + filepath + '\n' +
                        src.replace(/'use strict';\n/gm, '');
            },
        },

        dist: {

          src: dominoFiles,

          dest: 'build/domino.js',
        }
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['karma:watcha']);
  grunt.registerTask('testcoverage', ['karma:coverage']);
  grunt.registerTask('build', ['concat:dist']);

};