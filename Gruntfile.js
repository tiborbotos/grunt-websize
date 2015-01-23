/*
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
//		jshint: {
//			all: [
//				'Gruntfile.js',
//				'tasks/*.js'
//			],
//			options: {
//				jshintrc: '.jshintrc'
//			}
//		},
		websize: {
			test: {
			}
		}
	});

	// These plugins provide necessary tasks.
//	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadTasks('tasks');

};
