// 此文件为批处理，将ip.txt中地址进行排重处理，并获取其所在城市，生成数据文件data/relation.json

var fs = require('fs'),
    util = require('util'),
    http = require('http'),
	events = new require("events"),
	iconv = require('iconv-lite');
	
// 定义搜索类
function query(keyword){
	events.EventEmitter.call(this); 
	var that = this;
	var options = {
		host : 'gc.ditu.aliyun.com',
		port : 80,
		path : 'geocoding?a='+keyword,
		method : 'GET'
	};
	var req = http.request(options, function(res) {
		//console.log('STATUS: ' + res.statusCode);
		var buf = new Buffer(0);
		res.on('data', function (chunk) {
			var newBuf = new Buffer(buf.length+chunk.length);
			buf.copy(newBuf, 0);
			chunk.copy(newBuf, buf.length);
			buf = newBuf;
		});
		res.on('end', function(){
			that.emit('complete', JSON.parse(buf.toString()));
			//console.log(buf.toString());
		});
	});
	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});
	req.end();
}
util.inherits(query, events.EventEmitter);


//加载ip.txt文件，读取并分析所有地址，并且排重
var txt = fs.readFileSync('../data/ip.txt'),
	txt = iconv.decode(txt, 'GBK'),
	rows = txt.split("\n");
	
var address = [], idx = 0;
for(var i=0; i<rows.length; i++){
	row = rows[i].split(/\s+/g);
	if(row[2] && address.indexOf(row[2])<0){
		address.push(row[2]);
	}
}
console.log('排重后还有：'+address.length);


var relations = {}, errors = [], j=0;;
// 批量进行地理解析


function batch(keywords){
	var s = new query(keywords);
	s.on('complete',function(data){
		if(data.status!='E0'){
			errors.push(keywords);
		}else{
			var geo = data.address.split(',');
			relations[keywords] = geo;
			j++;
		}
		if(idx<address.length){
			idx++;
			batch(address[idx]);
		}else{
			fs.writeFileSync('../data/relation.json', JSON.stringify(relations));
			
			console.log('error for:'+errors.length+', ->'+errors.join(","));
			console.log('success for: '+j);
		}
	});
	console.log('batch for :'+address.length+'-'+idx+', '+keywords);
}
batch(address[idx]);

