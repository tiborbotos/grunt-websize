/* global require,console,phantom */
var page = require('webpage').create(),
	system = require('system'),
	address = "http://gawker.com?nosso=1",
	debugMode = false,
	isLoaded = false,
	loaded = 0,
	recieved = 0,
	additionalWaiting = 10000,
	sizeStats = {
		pageload: {
			files: 0,
			size: 0,
			html: {
				size: 0,
				files: 0
			},
			image: {
				size: 0,
				files: 0
			},
			javascript: {
				size: 0,
				files: 0
			},
			other: {
				size: 0,
				files: 0
			},
			domains: []
		},
		afterload: {
			files: 0,
			size: 0,
			html: {
				size: 0,
				files: 0
			},
			image: {
				size: 0,
				files: 0
			},
			javascript: {
				size: 0,
				files: 0
			},
			other: {
				size: 0,
				files: 0
			},
			domains: []
		}
	};

if (system.args.length === 1) {
	console.log('Failed! Missing url!');
	phantom.exit();
} else if (system.args.length >= 2) {
	address = system.args[1];
	if (system.args.length >= 3) {
		additionalWaiting = Number(system.args[2])
		additionalWaiting = isNaN(additionalWaiting) ? 10000 : additionalWaiting;
	}
}

page.onResourceReceived = function (res) {
	if(res.stage !== 'start') {
		return;
	}

	if (debugMode) {
		console.log('(#' + res.id + ', stage ' + res.stage + ', Contenttype: ' + res.contentType + ', size: ' + res.bodySize + ', url: ' + res.url );
	}

	recieved += Number(res.bodySize || 0);

	var sizeStat = isLoaded ? sizeStats.afterload : sizeStats.pageload,
		domain = res.url.substring(0, res.url.indexOf('/', 9)),
		contentType = res.contentType || 'unknown',
		size = Number(res.bodySize || 0);

	sizeStat.size += size;
	sizeStat.files += 1;
	if (sizeStat.domains.indexOf(domain) === -1) {
		sizeStat.domains.push(domain);
	}

	if (contentType.indexOf('text/html') > -1) {
		sizeStat.html.size += size;
		sizeStat.html.files += 1;
	} else if (contentType.indexOf('application/javascript') > -1) {
		sizeStat.javascript.size += size;
		sizeStat.javascript.files += 1;
	} else if (contentType.indexOf('image/') > -1) {
		sizeStat.image.size += size;
		sizeStat.image.files += 1;
	} else {
		sizeStat.other.size += size;
		sizeStat.other.files += 1;
	}
};

page.open(address, function (status) {
	if (status !== 'success') {
		console.log('Failed!' + status);
		phantom.exit();
	} else {
		sizeStats.date = (new Date()).getTime();
		if (debugMode) {
			console.log('Loaded! (' + address + ')');
		}
		loaded = recieved;
		recieved = 0;
	}

	setTimeout(function() {
		console.log('Ok!' + JSON.stringify(sizeStats));
		phantom.exit();
	}, additionalWaiting);
});
