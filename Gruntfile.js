'use strict';

module.exports = function(grunt) {

    // import package.json
    var pkg = grunt.file.readJSON('package.json');

    // DominoFiles
    var dominoFiles = [
        'src/domino.js',
        'src/core/support.js',
        'src/core/element.js',
        'src/core/object.js',
        'src/core/observable.js',
        'src/core/scheduler.js',
        'src/device/abstract.js',
        'src/device/mouse.js'
    ];


    // GENERATE FILES CONFIGURATION FOR KARMA (DEV AND CI MODE)

    // Shared files loaded by karma test runner
    var sharedTestFiles = [

        {
            pattern: 'test/vendor/*.js',
            watched: false
        },

        {
            pattern: 'node_modules/expect.js/expect.js',
            watched: false
        },

        {
            pattern: 'node_modules/sinon/pkg/sinon.js',
            watched: false
        },

        {
            pattern: 'node_modules/sinon/pkg/sinon-ie.js',
            watched: false
        },

        {
            pattern: 'test/fixtures/**/*.html',
            included: false
        },

        {
            pattern: 'test/helper/**/*.js'
        }

    ];

    // Files loaded by karma test runner for development
    var testFilesDev = [];

    // Files loaded by karma test runner for continuous integration (build)
    var testFilesBuild = [];

    // add shared files
    sharedTestFiles.forEach(function(shared) {
        testFilesDev.push(shared);
        testFilesBuild.push(shared);
    });

    // Add all dominos sources for development
    dominoFiles.forEach(function(dominoFile) {
        testFilesDev.push({
            pattern: dominoFile
        });
    });

    // Add freshly build domino
    testFilesBuild.push({
        pattern: 'build/' + pkg.name + '-' + pkg.version + '.js'
    });


    // test specs
    var specs = [{
        pattern: 'test/unit/**/*.js'
    }, {
        pattern: 'test/integration/**/*.js'
    }];

    // add specs to both mode
    specs.forEach(function(spec) {
        testFilesDev.push(spec);
        testFilesBuild.push(spec);
    });

    // GRUNT CONFIGURATION
    grunt.initConfig({

        pkg: pkg,

        jshint: {

            files: [

                'Gruntfile.js',
                'src/**/*.js',
                'package.json',
                '.jshintrc',
                'test/**/*.js'

            ],

            options: {

                jshintrc: '.jshintrc',

                ignores: ['test/vendor/jquery-1.10.2.js']

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

            unit: {

                configFile: 'karma.conf.js',

                files: testFilesDev,

                browsers: ['Firefox', 'PhantomJS', 'Chrome', 'Safari', 'IE8 - WinXP', 'IE9 - Win7', 'IE10 - Win7']

            },

            watch: {

                configFile: 'karma.conf.js',

                singleRun: false,

                autoWatch: true,

                files: testFilesDev,

                browsers: ['Firefox', 'PhantomJS', 'Chrome', 'Safari', 'IE8 - WinXP', 'IE9 - Win7', 'IE10 - Win7']

            },

            quickwatch: {

                configFile: 'karma.conf.js',

                singleRun: false,

                autoWatch: true,

                files: testFilesDev,

                browsers: ['PhantomJS']

            },

            quick: {

                configFile: 'karma.conf.js',

                files: testFilesDev,

                browsers: ['PhantomJS']

            },

            coverage: {

                configFile: 'karma.conf.js',

                files: testFilesDev,

                browsers: ['PhantomJS'],

                reporters: ['coverage']

            },

            phantomjsci: {

                configFile: 'karma.conf.js',

                files: testFilesBuild,

                browsers: ['PhantomJS']

            },

            chromeci: {

                configFile: 'karma.conf.js',

                files: testFilesBuild,

                browsers: ['SL_Chrome']

            },

            firefoxci: {

                configFile: 'karma.conf.js',

                files: testFilesBuild,

                browsers: ['SL_Firefox']

            },

            safarici: {

                configFile: 'karma.conf.js',

                files: testFilesBuild,

                browsers: ['SL_Safari']

            },

            ie8ci: {

                configFile: 'karma.conf.js',

                files: testFilesBuild,

                browsers: ['SL_IE8']

            },

            ie9ci: {

                configFile: 'karma.conf.js',

                files: testFilesBuild,

                browsers: ['SL_IE9']

            },

            ie10ci: {

                configFile: 'karma.conf.js',

                files: testFilesBuild,

                browsers: ['SL_IE10']

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

                src: dominoFiles,

                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.js'

            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('watchtest', ['karma:watch']);
    grunt.registerTask('quicktest', ['karma:quick']);
    grunt.registerTask('quickwatchtest', ['karma:quick']);
    grunt.registerTask('cov', ['karma:coverage']);
    grunt.registerTask('build', ['concat:dist']);

    grunt.registerTask('build-tester-templates', 'Build templates list for manual tester', function() {

        var fs = require('fs');

        grunt.log.writeln('Generating templates.json...');

        var files = fs.readdirSync('test/templates');

        var list = [];

        files.forEach(function(file) {
            var fileContent = fs.readFileSync('test/templates/' + file, 'utf8');
            var description = fileContent.split('\n')[0].replace(/<h1>|<\/h1>/g, '');
            
            list.push({

                url: file,

                description: description

            });

        });

        fs.writeFileSync('test/domino_event_tester/resources/fixtures.json', JSON.stringify(list));

        grunt.log.writeln('All done!');

        return true;
    });
};