var fs = require('fs')
  , redis = require("redis")
  , qqwry = require('lib-qqwry').info();



// client.on("error", function (err) {
//     console.error(err);
// });
// client.on("reconnecting", function (err) {
//     console.warn("Redis reconnecting ",err);
// });


//module.exports = client;

var ip = "114.247.50.32";
var keywords = qqwry.searchIP(ip);
console.log(keywords);


var client = null;

module.exports = {

	connectRedis: function(client){
		if(!client){
			client = redis.createClient(config.port, config.host, {detect_buffers: true});
		}
	}

	_getRelation: function(country){
		if(client){	// from redis

		}else{	// from json
			var 
		}
	}

	getAddress: function(ip){
		return qqwry.searchIP(ip).Country;
	},

	getArea: function(ip){
		var country = this.getAddress(ip);

	},

	getBounds: function(ip){

	}

};


function (){

}