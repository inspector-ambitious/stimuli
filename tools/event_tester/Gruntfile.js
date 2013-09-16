'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        bower: {

            install: {

                options: {

                    cleanBowerDir: true

                }
                
            }
        },

        jshint: {

            files: [

                'Gruntfile.js',
                'js/**/*.js',
                'bower.json',
                '../../.jshintrc'
            ],

            options: {

                jshintrc: '.jshintrc'

            }

        },
    });

    grunt.registerTask('build:templates', 'Build templates list for manual tester', function() {

        var fs = require('fs');

        grunt.log.writeln('Generating templates.json...');

        var files = fs.readdirSync('templates');

        var list = [];

        files.forEach(function(file) {
            var fileContent = fs.readFileSync('templates/' + file, 'utf8');
            var description = fileContent.split('\n')[0].replace(/<h1>|<\/h1>/g, '');
            
            list.push({

                url: file,

                description: description

            });

        });

        fs.writeFileSync('resources/templates.json', JSON.stringify(list));

        grunt.log.writeln('All done!');

        return true;

    });

    grunt.loadNpmTasks('grunt-bower-task');

    grunt.loadNpmTasks('grunt-contrib-jshint');

};