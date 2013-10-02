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

            watch: {

                configFile: 'karma.conf.js',

                singleRun: false,

                autoWatch: true,

                files: conf.testFilesDev

            },

            phantomjs: {

                configFile: 'karma.conf.js',

                files: conf.testFilesBuild,

                browsers: ['PhantomJS']
            },

            browserstack_desktop_ie: {

                configFile: 'karma.conf.js',

                files: conf.testFilesBuild,

                reportSlowerThan: 30000,

                // TODO: (yhwh) IE11 deactivated for now since there is a bug in sizzle  (Permission denied)
                browsers: ['BS_IE8', 'BS_IE9', 'BS_IE10' /* , 'BS_IE11'*/]

            },

            browserstack_desktop_webkit: {

                configFile: 'karma.conf.js',

                files: conf.testFilesBuild,

                reportSlowerThan: 30000,

                browsers: ['BS_CHROME', 'BS_SAFARI51', 'BS_SAFARI6', 'BS_OPERA15']

            },

            browserstack_desktop_gecko: {

                configFile: 'karma.conf.js',

                files: conf.testFilesBuild,

                reportSlowerThan: 30000,

                browsers: [ 'BS_FIREFOX']
            },

            browserstack_device: {

                configFile: 'karma.conf.js',

                files: conf.testFilesBuild,

                reportSlowerThan: 30000,

                browsers: [ 'BS_ANDROID_4', 'BS_ANDROID_41', 'BS_ANDROID_42', 'BS_IOS_6']
            }

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
                }
            },

            dist: {

                src: conf.stimuliFiles,

                dest: conf.distFolder + '<%= pkg.name %>.js'

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
            },

            blank: {

                src: 'src/blank.html',

                dest: conf.distFolder + 'blank.html'
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

    grunt.registerTask('sizzle', function(){
        var done = this.async();
        grunt.util.spawn({ cmd: 'bower', args: ['install']}, function() {
            grunt.util.spawn({ cmd: 'rm', args: ['-rf', 'lib']}, function() {
                grunt.util.spawn({ cmd: 'mv', args: ['bower_components', 'lib']}, function() {
                    grunt.util.spawn({ cmd: 'mv', args: ['lib/sizzle/dist/sizzle.js', 'lib/sizzle/']}, done);
                });
            });

        });
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsduck');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-hub');

    grunt.registerTask('build', ['sizzle', 'concat:dist', 'jsduck', 'copy']);


};