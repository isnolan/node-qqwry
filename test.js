var lbs = require('./old.js');

var t1 = new Date();

console.log(lbs.query('127.0.0.1'));

console.log(lbs.query('114.247.50.32'));

console.log(lbs.query('42.121.18.30'));


console.log(lbs.query('116.255.159.28'));


console.log(lbs.query('175.41.22.214'));


console.log(lbs.query('113.46.75.217'));


console.log('time:'+(new Date()-t1));
