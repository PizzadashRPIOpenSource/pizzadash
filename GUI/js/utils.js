function populateCategories(){
	var select = document.getElementById("selectCategory");
	getCategories(function(rootCategories){
		// console.log(rootCategories);
		for (var rootCat in rootCategories){
			// console.log(rootCat);
			var rootEl = document.createElement("option");
			rootEl.textContent=rootCat;
			rootEl.value = rootCat;
			select.appendChild(rootEl);
		}
	});
}

function getCategories(callback){
	var url=window.location.href+"/categories";
	httpGetAsync(url,function(data){
		var json=JSON.parse(data);
		callback(json);
	});
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
	httpGetAsync(url,function(data){
		var json=JSON.parse(data);
		callback(json);
	});
}

function parseCat(){
	var select=document.getElementById('selectCategory');
	var cat=select.value.split(":");
	var url=window.location.href+"/getCat?rootCat="+cat[0];
	httpGetAsync(url,function(data){
		console.log("Parsed: \n");
		console.log(data);
	})
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