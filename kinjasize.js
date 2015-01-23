/* global require, console, phantom */
var page = require('webpage').create(),
	system = require('system'),
	address = "http://gawker.com?nosso=1",
	loaded = 0,
	recieved = 0,
	additionalWaiting;

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
	recieved += Number(res.bodySize || 0);
};

page.open(address, function (status) {
	if (status !== 'success') {
		console.log('Failed!' + status);
		phantom.exit();
	} else {
		console.log('loaded the address');
		loaded = recieved;
		recieved = 0;
	}

	setTimeout(function() {
		console.log('Ok!' + loaded + ',' + recieved);
		phantom.exit();
	}, additionalWaiting);
});
