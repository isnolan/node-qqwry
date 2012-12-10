var ipgeo = require('../index.js');

ipgeo.loadDataFile('../qqwry.dat');

var t1 = new Date();

console.log(ipgeo.lookup('127.0.0.1'));

console.log(ipgeo.lookup('114.247.50.32'));


console.log(ipgeo.lookup('42.121.18.30'));


console.log(ipgeo.lookup('116.255.159.28'));


console.log(ipgeo.lookup('175.41.22.214'));


console.log(ipgeo.lookup('113.46.75.217'));

console.log('time:'+(new Date()-t1));
