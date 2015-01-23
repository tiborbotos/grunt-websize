'use strict';

module.exports = function (grunt) {
	var child = require('child');

	grunt.registerMultiTask('websize', 'A Grunt plugin for logging filesize.', function() {
		child = exec('phantomjs --web-security=false kinjasize.js http://replicationlag.kinja.com?nosso=1 10000',
			function (error, stdout, stderr) {
				grunt.log.writeln('stdout: ' + stdout);
				grunt.log.writeln('stderr: ' + stderr);
				if (error !== null) {
					grunt.log.writeln('exec error: ' + error);
				}
			});
	});
}
