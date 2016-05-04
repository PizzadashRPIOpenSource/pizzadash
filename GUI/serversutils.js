var pizzapi = require('dominos');
var prompt = require('prompt');

var mystores;

function getStores(zip, callback){
	pizzapi.Util.findNearbyStores(
		zip, 
		'Delivery',
		function(storeData) {
			return callback(storeData);
		}
	);
}

function getMenu(store, callback){
	store.getMenu(
		function(storeData){
			return callback(storeData);
		}
	);
}

