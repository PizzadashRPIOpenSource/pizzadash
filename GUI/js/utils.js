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
	var url=window.location.href+"/getCat?rootCat="+select.value;
	httpGetAsync(url,function(data){
		console.log("Parsed: \n");
		console.log(data);
		populateItems(JSON.parse(data));
	})
}

function populateItems(data){
	$("#productInfo").html("<br>");
	var items=data['items'];
	for (i in items){
		var check1=false;
		var check2=false;
		var item=items[i];
		console.log(item.name);
		$('#productInfo').append('<p style="color:#006491;font-size:125%;display:inline">'+item.name+': </p>');
		$('#productInfo').append('<p style="color:#e31837;display:inline;font-size=110%"> Code: '+item.code+'</p>');
		if (item.description.length!=0){
			$('#productInfo').append('<p>Description: '+item.description+'</p>');
			var check1=true;
		}
		if(item['availableToppings'].length!=0){
			$('#productInfo').append('<p>Toppings: '+item['availableToppings']+'</p>');
			var check2=true;
		}
		if (check2 || check1){
			$('#productInfo').append('<br>');
		} else {
			$('#productInfo').append('<br></br>');
		}
	}
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