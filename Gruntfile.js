module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
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
        clean: ['build'],
        concat: {
            dist: {
                src: ['src/boneyard.events.js', 'src/boneyard.model.js', 'src/boneyard.collection.js'],
                dest: 'build/backbone.boneyard.js'
            }
        },
        umd: {
            all: {
                src: 'build/backbone.boneyard.js',
                indent: '    ', // optional, indent source code
                deps: { // optional
                    'default': ['Backbone'],
                    amd: ['backbone'],
                    cjs: ['backbone'],
                    global: ['Backbone']
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/backbone.boneyard.min.js': ['build/backbone.boneyard.js']
                }
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-umd');

    // Register tasks
    grunt.registerTask('default', ['jasmine', 'clean', 'concat:dist', 'umd', 'uglify']);
};
