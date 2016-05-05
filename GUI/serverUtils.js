var pizzapi = require('dominos');
var prompt = require('prompt');
var collections = require('collections');

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
	var Items=[];
	if (rootCat==-1){
		return;
	}
	if (subCat==undefined){
		return getRootCatItems(rootCat,session,Items);
	}
	getSubCatItems(rootCat,subCat,session,Items);


}

function getRootCatItems(rootCat,session,Items){
	for (var i=0; i<session.cats[rootCat].length; i++){
		getSubCatItems(rootCat,session.cats[rootCat][i],session,Items);
	}
}

function getSubCatItems(rootCat,subCat,session,Items){
	console.log(rootCat+":"+subCat);
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
