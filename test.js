var lbs = require('./index.js');

var ips = [
	'127.0.0.1',
	'114.247.50.32',
	'42.121.18.30',
	'116.255.159.28',
	'175.41.22.214',
	'113.46.75.217'
];

var t1 = new Date();

for(var i=0; i<ips.length; i++){
	console.log(lbs.query(ips[i]));
}

console.log('time:'+(new Date()-t1));
