//ip-geo 使用纯真数据库
//by:zhujinliang
(function(){
var fs = require('fs');
var iconv = require('iconv-lite');

var geodat = null, indexFirst = 0, indexLast = 0;
var ipRegexp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

var _loadDat = function(file){
	try{
		geodat = fs.readFileSync(file);
	}catch(err){return false }
	if(geodat){
		indexFirst = geodat.readUInt32LE(0);
		indexLast = geodat.readUInt32LE(4);
		return true;
	}else return false;
}
var _ipToInt32 = function(ip){
	var result = ipRegexp.exec(ip);
	if(result){
		return parseInt(result[1])*16777216
			+ parseInt(result[2])*65536
			+ parseInt(result[3])*256
			+ parseInt(result[4]);
	}
	return false;
}
var _searchIndex = function(intip){
	var index_current, index_top = indexLast, index_bottom = indexFirst;
	var record;
	index_current = parseInt((index_top - index_bottom)/7/2)*7+index_bottom;	
	do{
		record = geodat.readUInt32LE(index_current);
		if(record > intip){
			index_top = index_current;
			index_current = parseInt((index_top-index_bottom)/14)*7+index_bottom;  
		}else{
			index_bottom = index_current;  
			index_current = parseInt((index_top-index_bottom)/14)*7+index_bottom;  
		}
	}while(index_bottom<index_current);	
	return geodat.readUInt32LE(index_current+4)%16777216;
}
var _pushString = function(array, addr){
	if(addr==0){
		array.push('未知');
		return 0;
	}
	var buf = new Buffer(255);
	var stringEnd = addr;
	while(geodat[stringEnd]){
		stringEnd++;
	}
	array.push(iconv.decode(geodat.slice(addr, stringEnd), 'GBK').replace('CZ88.NET', ''));
	return stringEnd;
}
var _readRecord = function(addr){
	var redirectMode = geodat.readUInt8(addr+=4), redirectAddr, tmpAddr, geo = [];
	if(redirectMode == 1){
		redirectAddr = geodat.readUInt32LE(addr+1)%16777216;
		if(geodat.readUInt8(redirectAddr) == 2){
			_pushString(geo, geodat.readUInt32LE(redirectAddr+1)%16777216);
			tmpAddr = redirectAddr + 4;
		}else{
			tmpAddr = _pushString(geo, redirectAddr)+1;
		}
	}else if(redirectMode == 2){
		_pushString(geo, geodat.readUInt32LE(addr+1)%16777216);
		tmpAddr = addr+4;
	}else{
		tmpAddr = _pushString(geo, addr)+1;
	}
	redirectMode = geodat.readUInt8(tmpAddr);
	if(redirectMode == 2 || redirectMode == 1){
		_pushString(geo, geodat.readUInt32LE(tmpAddr+1)%16777216);
	}else{
		_pushString(geo, tmpAddr);
	}
	return geo;
}
module.exports = {
	loadDataFile : function(path){
		return (!!indexFirst) || _loadDat(path||'qqwry.dat');
	},
	lookup : function(ip){
		if(indexFirst){
			var intip = _ipToInt32(ip);
			if(intip) return _readRecord(_searchIndex(intip));
			return ['错误的IP地址',''];
		}
	}
}
})();
