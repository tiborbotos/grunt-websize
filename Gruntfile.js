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
				url: 'http://gawker.com'
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
//	grunt.loadNpmTasks('child_process');
	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('test', ['websize']);
};
