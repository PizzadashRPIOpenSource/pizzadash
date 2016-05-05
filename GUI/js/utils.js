function populateCategories(){
	var select = document.getElementById("selectCategory"); 
	getCategories(function(rootCategories){
		for (var rootCat in rootCategories){
			console.log(rootCat);
			/*for(var i = 0; i < subCats.length; i++) {
			    var opt = subCats[i];
			    var el = document.createElement("option");
			    el.textContent = opt;
			    el.value = "\t"+opt;
			    select.appendChild(el);
			}*/
		}
	}); 
}

function getCategories(callback){
	var url=window.location.href+"/categories";
	console.log(httpGetAsync(url,function(data){
		var json=JSON.parse(data);
		callback(json.categories);
	}));
}

function populateStores(){
	var select = document.getElementById("selectStore");
	var nl="<br>";
	getStores(function(options){
		for(var i = 0; i < options.length; i++) {
		    var opt = options[i];
		    var address = opt.AddressDescription.split('\n');
		    var el = '<input type="radio" name="store"';
		    el+=' value="'+opt.StoreID+'"/>';
		    el="<p>"+el+" StoreID: "+opt.StoreID+nl+address[0]+nl+address[1]+nl;
		    el+="Delivery Hours: "+opt.ServiceHoursDescription.Delivery;
		    var radioFragment = document.createElement('div');
   			radioFragment.innerHTML = el;
		    select.appendChild(radioFragment.firstChild);
		}
	});
}

function getStores(callback){
	var url=window.location.href+"/find";
	console.log(httpGetAsync(url,function(data){
		var json=JSON.parse(data);
		callback(json);
	}));
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}