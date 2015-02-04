'use strict';

module.exports = function (grunt) {
	var execFile = require('child_process').execFile;

	/**
	 * Main grunt task for web size
	 */
	grunt.registerMultiTask('websize', 'A Grunt plugin for logging filesize.', function() {
		var cb = this.async();

		// default options
		var options = this.options({
			timeout: 0,
			url: 'http://google.com',
			append: false,
			historyLength: 100
		});

		// execute phantomjs
		var cp = execFile('phantomjs', ['--web-security=false', 'phantom_websize.js', options.url, options.timeout.toString()], function (error, stdout, stderr) {
			if (error !== null) {
				grunt.log.writeln('Exec error: ' + error);
			}
			cb();
		});

		// clear the history of the websize output
		function removeOldHistory(result, historyLength) {
			var dates = [],
				date;
			for (date in result) {
				dates.push(date);
			}
			while (dates.length > historyLength) {
				date = dates.slice(0,1)[0];
				dates = dates.slice(1);
				delete result[date];
			}
		}

		var captureOutput = function (child, output) {
			child.on('data', function (data) {

				// Ok! coming from phantom_websize.js pahtnomjs script
				if (data.indexOf('Ok!') === 0) {
					var sizeStats = JSON.parse( data.substr(3)),
						result = {};

					grunt.log.writeln('Address (' + options.url + ') has been loaded and analysed, ' + sizeStats.pageload.size + ' bytes from ' + sizeStats.pageload.files + ' files');

					if (options.append) {
						try {
							result = grunt.file.readJSON(options.reportPath);
						} catch (error) {
							result = {};
						}
						removeOldHistory(result, options.historyLength - 1);
					}

					result[sizeStats.date] = sizeStats;

					grunt.file.write(options.reportPath, JSON.stringify(result));
				} else {
					if (data.indexOf('Failed') === 0) {
						grunt.log.writeln('Error during script execution! ' + data);
					} else {
						grunt.log.writeln('Unknown error happened! ' + data);
					}
				}

			});
		};

		captureOutput(cp.stdout, process.stdout);
		captureOutput(cp.stderr, process.stderr);
	});
};
