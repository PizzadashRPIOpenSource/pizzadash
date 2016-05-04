function populateCategories(){
	var select = document.getElementById("selectCategory"); 
	getCategories(function(options){
		for(var i = 0; i < options.length; i++) {
		    var opt = options[i];
		    var el = document.createElement("option");
		    el.textContent = opt;
		    el.value = opt;
		    select.appendChild(el);
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
	getStores(function(options){
		for(var i = 0; i < options.length; i++) {
		    var opt = options[i];
		    var el = '<input type="radio" name="store"';
		    el+=' value="'+opt.StoreID+'"/>';
		    el="<p>"+el+" "+opt.StoreID+"</p><br></br>"
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