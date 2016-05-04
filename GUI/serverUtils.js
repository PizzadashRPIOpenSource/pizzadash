var pizzapi = require('dominos');
var prompt = require('prompt');

var mystores;

module.exports.getStores=function getStores(zip, callback){
	pizzapi.Util.findNearbyStores(
		zip, 
		'Delivery',
		function(storeData) {
			console.log(storeData.result.Stores);
			callback(storeData);
		}
	);
}

module.exports.getMenu=function getMenu(store, callback){
	store.getMenu(
		function(storeData){
			callback(storeData);
		}
	);
}

