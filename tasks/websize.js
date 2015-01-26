'use strict';

module.exports = function (grunt) {
	var exec = require('child_process').execFile,
		child;

	grunt.registerMultiTask('websize', 'A Grunt plugin for logging filesize.', function() {

		var options = this.options({
			timeout: 1000
		});

		exec('phantomjs --web-security=false phantom_websize.js http://replicationlag.kinja.com?nosso=1 10000',
			{timeout: 30000, cwd: '..'},
			function (error, stdout, stderr) {

			console.log('FOOO')
			grunt.log.writeln('stdout: ' + stdout);
			grunt.log.writeln('stderr: ' + stderr);
			if (error !== null) {
				grunt.log.writeln('exec error: ' + error);
			}
		});
	});
};
