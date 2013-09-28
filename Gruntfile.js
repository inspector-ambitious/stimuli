'use strict';

var conf = require('./files.conf.js');


module.exports = function(grunt) {

    // GRUNT CONFIGURATION
    grunt.initConfig({

        pkg: conf.pkg,

        jshint: {

            files: [

                'Gruntfile.js',
                'src/**/*.js',
                '*.json',
                '.jshintrc',
                'test/**/*.js'
            ],

            options: {

                jshintrc: '.jshintrc'

            }

        },

        jsdoc: {

            dist: {

                src: ['src/**/*.js'],

                options: {
                    destination: 'docs'
                }
            }

        },

        karma: {

            droid: {

                configFile: 'karma.conf.js',

                files: conf.testFilesDev,

                browsers: ['Android_2.3']
            },

            ios: {

                configFile: 'karma.conf.js',

                files: conf.testFilesDev,

                browsers: ['iOS']
            },

            full: {

                configFile: 'karma.conf.js',

                files: conf.testFilesDev,

                browsers: ['Firefox', 'PhantomJS', 'Chrome', 'Safari', 'IE8 - WinXP', 'IE9 - Win7', 'IE10 - Win7']

            },

            fullwatch: {

                configFile: 'karma.conf.js',

                singleRun: false,

                autoWatch: true,

                files: conf.testFilesDev,

                browsers: ['Firefox', 'PhantomJS', 'Chrome', 'Safari', 'IE8 - WinXP', 'IE9 - Win7', 'IE10 - Win7']

            },

            quick: {

                configFile: 'karma.conf.js',

                files: conf.testFilesDev,

                reporter: ['dots'],


            },

            quickwatch: {

                configFile: 'karma.conf.js',

                singleRun: false,

                autoWatch: true,

                files: conf.testFilesDev

            },

            quickcoverage: {

                configFile: 'karma.conf.js',

                files: conf.testFilesDev,


                reporters: ['coverage']

            },

            fullcoverage: {

                configFile: 'karma.conf.js',

                files: conf.testFilesDev,

                reporters: ['coverage'],

                browsers: ['Firefox', 'PhantomJS', 'Chrome', 'Safari', 'IE8 - WinXP', 'IE9 - Win7', 'IE10 - Win7']

            },

            travis: {

                configFile: 'karma.conf.js',

                files: conf.testFilesBuild,

                reporters: ['progress'],

                browsers: ['SL_IE8']

            },

        },

        bower: {

            install: {

                options: {
                    cleanBowerDir: true
                }
                
            }
        },

        concat: {

            options: {

                stripBanners: true,

                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + '\'use strict\';\n',

                process: function(src, filepath) {
                    return '\n// Source: ' + filepath + '\n' +
                        src.replace(/'use strict';\n/gm, '');
                },
            },

            dist: {

                src: conf.stimuliFiles,

                dest: conf.distFolder + '<%= pkg.name %>-<%= pkg.version %>.js'

            }
        },

        copy: {

            license: {
                
                src: 'LICENSE',

                dest: conf.distFolder

            },

            readme: {

                src: 'README.md',

                dest: conf.distFolder
            }

        },

        hub: {

            event_tester: {

              src: ['tools/event_tester/Gruntfile.js'],

              tasks: ['jshint', 'build:templates']

            }
        },

        jsduck: {

            main: {
                // source paths with your code
                src: [
                    'src'
                ],

                // docs output dir
                dest: conf.distFolder + 'docs',

                // extra options
                options: {
                    'title': "Stimuli <%= pkg.version %> Documentation"
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsduck');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-hub');

    
    grunt.registerTask('quickwatchtest', ['karma:quickwatch']);
    

    grunt.registerTask('package', ['bower:install',  'concat:dist', 'jsduck', 'copy']);

    grunt.registerTask('build', ['package']);

    grunt.registerTask('coverage', ['karma:quickcoverage']);

    grunt.registerTask('test', ['karma:quick']);
    grunt.registerTask('test.watch', ['karma:quickwatch']);
    grunt.registerTask('test.full', ['karma:full']);
    grunt.registerTask('test.full.watch', ['karma:fullwatch']);
    grunt.registerTask('test.sauce', ['karma:travis']);
};