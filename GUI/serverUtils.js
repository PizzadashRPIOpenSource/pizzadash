var pizzapi = require('dominos');
var prompt = require('prompt');
var Set = require('collections/set');
var util = require('util');
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

module.exports.jsonCategories=function jsonCategories(storeData, callback){
	var out={};
	if(module.exports.defined(storeData,'menuByCode')){
		for (i in storeData.menuByCode){
			var item = storeData.menuByCode[i];
			// console.log(util.inspect(item,{depth: 2}));
			if(item.menuData.hasOwnProperty('ProductType')){
				var ret = {
					"name":item.menuData.Name,
					"code":item.menuData.Code,
					"description":item.menuData.Description,
					"defaultToppings":item.menuData.DefaultToppings,
					"availableToppings":item.menuData.AvailableToppings,
					"defaultSides":item.menuData.DefaultSides,
					"availableSides":item.menuData.AvailableSides
				}
				if(!out.hasOwnProperty(item.menuData.ProductType)){
					out[item.menuData.ProductType] = [];
				}
				out[item.menuData.ProductType].push(ret);
			}
		}

	}
	return out;
}

module.exports.getItemsInCategory=function getItemsInCategory(rootCat, session,callback){
	//var Items=new Set();
	data={items:[]};
	if (rootCat!=-1){
		for(i in session.cats[rootCat]){
			data.items.push(session.cats[rootCat][i]);
		}
	}
	callback(data);
}

module.exports.getMenuInfo=function getMenuInfo(session, callback){
	if(module.exports.defined(session, 'storeData', 'menuByCode')){
		var toReturn = [];
		for(item in session.storeData.menuByCode){
			getInfoByCode(session, item, function(ret){
				toReturn.push(ret);
			});
		}
		callback(toReturn);
	}
}

module.exports.getInfoByCode=function getInfoByCode(session, code, callback){
	if(module.exports.defined(session, 'storeData', 'menuByCode', code)){
		var item = session.storeData.menuByCode[code];
		var ret = {
			"name":item.menuData.Name,
			"code":item.menuData.Code,
			"description":item.menuData.Description,
			"availableToppings":item.menuByCode.AvailableToppings
		}
		callback(ret);
	}
}
