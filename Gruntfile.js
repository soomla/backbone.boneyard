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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['jasmine']);
};
