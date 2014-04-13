module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            banner:
                '// Backbone.Boneyard\n' +
                '// v<%= pkg.version %>\n' +
                '//\n' +
                '// Copyright (c)<%= grunt.template.today("yyyy") %> SOOMLA inc.\n' +
                '// Distributed under MIT license\n' +
                '//\n' +
                '// <%= pkg.repository.url %>\n' +
                '\n'
        },
        jasmine : {
            src : [
                'bower_components/underscore/underscore.js',
                'bower_components/backbone/backbone.js',
                'src/**/*.js'
            ],
            options : {
                specs : 'spec/**/*.js'
            }
        },
        watch: {
            files: '**/*.js',
            tasks: ['jasmine']
        },
        clean: ['dist'],
        concat: {
            dist: {
                src: ['src/boneyard.js', 'src/boneyard.events.js', 'src/boneyard.model.js', 'src/boneyard.collection.js'],
                dest: 'dist/backbone.boneyard.js'
            },

            // A task for prepending the banner to the development
            // and minified versions of the built files
            'banner': {
                options: {
                    banner: "<%= meta.banner %>"
                },
                files: {
                    'dist/backbone.boneyard.js': ['dist/backbone.boneyard.js'],
                    'dist/backbone.boneyard.min.js': 'dist/backbone.boneyard.min.js'
                }
            }
        },
        umd: {
            all: {
                src: 'dist/backbone.boneyard.js',
                indent: '    ',                     // optional, indent source code
                deps: {                             // optional
                    'default': ['Backbone'],
                    amd: ['backbone'],
                    cjs: ['backbone'],
                    global: ['Backbone']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/backbone.boneyard.min.js': ['dist/backbone.boneyard.js']
                }
            }
        },
        docco: {
            src: ['dist/backbone.boneyard.js'],
            options: {
                output: 'docs/'
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-docco');
    grunt.loadNpmTasks('grunt-umd');


    // Register tasks
    grunt.registerTask('default', ['jasmine', 'clean', 'concat:dist', 'umd', 'uglify', 'concat:banner', 'docco']);
};
