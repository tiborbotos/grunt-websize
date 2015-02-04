/*
 * https://github.com/tiborbotos/grunt-websize
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		websize: {
			default: {
				options: {
					url: 'http://google.com',
					timeout: 1000,
					reportPath: 'websize/google.txt',
					append: false
				}
			},
			defaultWithAppend: {
				options: {
					url: 'http://google.com',
					timeout: '1000',
					reportPath: 'websize/google.txt',
					append: true,
					historyLength: 3
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('test', ['websize']);
};
