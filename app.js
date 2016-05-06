var dash_button = require('node-dash-button');
var pizzapi = require('dominos');
var server= require('./GUI/server.js');
var express= require("express");
var bodyParser=require("body-parser");
var app = express();
//###################################################
//Website Run Control

app.use(bodyParser());
app.use("/", server.router);

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

//###################################################

var orderconfig;
try{
  orderconfig = require('./order.json');
  configButton(orderconfig,function(button){
  	var dash=button;
  })
}catch(e){
	console.log(e);
  orderconfig = require('./exampleorder.json');
}
function configButton(orderconfig,callback){
	//Input order from json
	console.log("Getting order from file...");
	var order = new pizzapi.Order(
	  orderconfig
	);
	//Add items to order
	console.log("Adding items to order...")
	var items = orderconfig.Order.Products;
	for (var i=0; i<items.length; i++) {
	  order.addItem(
	    new pizzapi.Item(
	      items[i]
	    )
	  );
	}
	order.StoreID=orderconfig.Order.StoreID;

	// Setup your Credit Card Info
	console.log("Setting up credit card info...")
	var cardInfo = new order.PaymentObject();
	cardInfo.Amount = order.Amounts.Customer;
	cardInfo.Number = orderconfig["cardNum"];
	cardInfo.CardType = order.validateCC(orderconfig["cardNum"]);
	cardInfo.Expiration = orderconfig["cardExp"];//  01/15 just the numbers "01/15".replace(/\D/g,'');
	cardInfo.SecurityCode = orderconfig["cardSec"];
	cardInfo.PostalCode = orderconfig["cardPost"]; // Billing Zipcode

	console.log("Adding card to order...");
	order.Payments.push(cardInfo);

	//TODO: if no mac address, find one and save it
	console.log("Searching for Dash Button...");
	var dash = dash_button(orderconfig["dashMacAddress"]);
	dash.on("detected", function (){
	    console.log("Dash Button Found");
	    console.log("Configuring Dash Button...");
		//Validate, price, and place order!
		order.validate(
		    function(result) {
		    		console.log(result);
		        console.log("Order is Validated");
		    }
		);
		order.price(
		    function(result) {
		    	console.log(result);
	            console.log("Order is Priced");
		    }
		);
		order.place(
		    function(result) {
		    	console.log(result);
	            console.log("Price is", result.result.Order.Amounts, "\nEstimated Wait Time",result.result.Order.EstimatedWaitMinutes, "minutes");
		        console.log("Order placed!");
		    }
		);
		callback(dash);
	});
}