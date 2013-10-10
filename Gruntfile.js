'use strict';

var conf = require('./files.conf.js');


module.exports = function(grunt) {

    // GRUNT CONFIGURATION
    grunt.initConfig({

        pkg: conf.pkg,

        jshint: {

            files: [
                '*.js',
                'src/**/*.js',
                '*.json',
                '.jshintrc',
                'test/**/*.js'
            ],

            options: {

                jshintrc: '.jshintrc'

            }

        },

        concat: {

            options: {

                stripBanners: true,

                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + '\'use strict\';\n',

                process: function(src, filepath) {
                    return '\n// Source: ' + filepath + '\n' +
                        src.replace(/'use strict';\n/g, '');
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
        grunt.util.spawn({ cmd: 'bower', args: ['install'], opts: {stdio: 'inherit'}}, function() {
            grunt.util.spawn({ cmd: 'rm', args: ['-rf', 'lib'], opts: {stdio: 'inherit'}}, function() {
                grunt.util.spawn({ cmd: 'mv', args: ['bower_components', 'lib'], opts: {stdio: 'inherit'}}, function() {
                    grunt.util.spawn({ cmd: 'mv', args: ['lib/sizzle/dist/sizzle.js', 'lib/sizzle/'], opts: {stdio: 'inherit'}}, done);
                });
            });

        });
    });

    grunt.registerTask('karma_phantom', function(){
        var done = this.async();
        grunt.util.spawn({
            cmd: 'karma',
            args: ['start', 'karma.travis.conf.js', '--browsers', 'PhantomJS'],
            opts: {stdio: 'inherit'}
        },done);
    });

    grunt.registerTask('karma_browserstack', function(){
        var done = this.async();
        grunt.util.spawn({
            cmd: 'karma',
            args: ['start', 'karma.travis.conf.js', '--browsers',
            'BS_IE8,BS_IE9,BS_IE10,BS_IE11,BS_FIREFOX,BS_ANDROID_4,BS_ANDROID_41,BS_ANDROID_42,BS_IOS_6,BS_CHROME,BS_SAFARI51,BS_SAFARI6'
            ],
            opts: {stdio: 'inherit'}
        },done);
    });

    grunt.registerTask('build_watch', function(){
        var done = this.async();
        grunt.util.spawn({
            cmd: 'karma',
            args: ['start', 'karma.travis.conf.js', '--auto-watch'],
            opts: {stdio: 'inherit'}
        },done);
    });

    grunt.registerTask('karma_watch', function(){
        var done = this.async();
        grunt.util.spawn({
            cmd: 'karma',
            args: ['start', 'karma.conf.js'],
            opts: {stdio: 'inherit'}
        },done);
    });

    grunt.registerTask('nginx_start', function(){
      var done = this.async();
      grunt.util.spawn({
        cmd: 'nginx',
        args: ['-c', '.nginx/nginx.conf', '-p', '.'],
        opts: {stdio: 'inherit'}
      },done);
    });

    grunt.registerTask('nginx_stop', function(){
      var done = this.async();
      grunt.util.spawn({
        cmd: 'nginx',
        args: ['-c', '.nginx/nginx.conf', '-p', '.', '-s', 'stop'],
        opts: {stdio: 'inherit'}
      },done);
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsduck');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-hub');

    grunt.registerTask('build', [ 'sizzle', 'concat:dist', 'jsduck', 'copy']);

    grunt.registerTask('travis', ['jshint', 'build', 'karma_phantom', 'karma_browserstack']);

    grunt.registerTask('travis_local', ['nginx_start', 'build', 'karma_browserstack', 'nginx_stop']);
};