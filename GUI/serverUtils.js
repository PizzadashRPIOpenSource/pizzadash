var pizzapi = require('dominos');
var prompt = require('prompt');
var Set = require('collections/set');

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

module.exports.getItemsInCategory=function getItemsInCategory(rootCat, subCat,session){
	//var Items=new Set();
	if (rootCat==-1){
		return;
	}
	var Items=new Set();
	var all=0;
	console.log(session.storeData)
	if (subCat==undefined){
		var all=1;
	}
	var subCategories=session.storeData.rootCategories[rootCat].menuData.Categories;
	for (var i=0; i<subCategories.length; i++){
		if (!all && subCategories[i].Name!=subCat){
			continue;
		}
		var products=subCategories[i].Products;
		//console.log(products);
	}
}

module.exports.defined=function defined(obj) {
	var args = Array.prototype.slice.call(arguments, 1);

	  for (var i = 0; i < args.length; i++) {
	    if (!obj || !obj.hasOwnProperty(args[i])) {
	      return false;
	    }
	    obj = obj[args[i]];
	  }
	  return true;
}
