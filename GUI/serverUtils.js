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

module.exports.getMenu=function getMenu(storeID, callback){
	var store=new pizzapi.Store(
		{
	        ID: storeID
	    }
	);
	store.getMenu(
		function(storeData){
			callback(storeData);
		}
	);
}

module.exports.jsonCategories=function jsonCategories(rootCategories){
	out={}
	for (rootCat in rootCategories){
		out[rootCat]=[];
		var arr=rootCategories[rootCat].menuData.Categories;
		for (i in arr){
			subCat=arr[i];
			if (subCat.Name.length>0){
				out[rootCat].push(subCat.Name);
			}
		}
	}
	return out;
}

