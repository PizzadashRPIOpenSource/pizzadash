var express= require("express");
var utils= require("./serverUtils.js");
var pizzapi=require("dominos");
var util = require('util');
var router = express.Router();
var path = __dirname+ '/html/';
var jsPath = __dirname+'/js/';
var cssPath = __dirname+'/css/';
var imgPath = __dirname+'/images/';
var session = {};

router.use(function (req,res,next){
	console.log("/"+req.method);
	next();
});

router.get("/",function(req,res){
	res.sendFile(path+'index.html');
});
router.post("/index", function(req,res){
	res.redirect("/customer");
});

router.get('*.js',function(req,res){
	var file=req.path.split("/");
	file=file[file.length-1];
	res.sendFile(jsPath+file);
});

router.get('*.css',function(req,res){
	var file=req.path.split("/");
	file=file[file.length-1];
	res.sendFile(cssPath+file);
});
router.get('*.jpg',function(req,res){
	var file=req.path.split("/");
	file=file[file.length-1];
	res.sendFile(imgPath+file);
});
router.get('*.png',function(req,res){
	var file=req.path.split("/");
	file=file[file.length-1];
	res.sendFile(imgPath+file);
});

router.get("/customer",function(req,res){
	res.sendFile(path+'PersonalInformation.html');
});

router.post("/customer",function(req,res){
	session.order={};
	session.order.firstName=req.body.firstname;
	session.order.lastName=req.body.lastname;
	session.order.address={};
	session.order.address.Street=req.body.streetaddress;
	session.order.address.City=req.body.city;
	session.order.address.Region=req.body.state;
	session.order.address.PostalCode=req.body.zip;
	session.order.email=req.body.email;
	session.order.phone=req.body.phone;
	res.redirect('/billing');
});

router.get("/billing",function(req,res){
	if(!utils.defined(session, 'order','address','PostalCode')){
		console.log("Must enter an address first");
		res.redirect('/customer');
	}else{
		res.sendFile(path+'CreditCardInfo.html');
	}
});

router.post("/billing",function(req,res){
	session.cardNum=req.body.cardNum;
	session.cardExp=req.body.cardExp;
	session.cardSec=req.body.cardSec;
	session.cardPost=req.body.cardPost;
	// console.log(session);
	res.redirect("/store");
});

router.get("/store",function(req,res){
	if(!utils.defined(session, 'order','address','PostalCode')){
		console.log("Must enter an address first");
		res.redirect('/customer');
	}else{
		res.sendFile(path+'storePicker.html');
	}
});

router.get("/store/find",function(req,res){
	var zip = session.order.address.PostalCode;
	utils.getStores(zip,function(storeData){
		res.json(storeData.result.Stores);
	});
});

router.post("/store",function(req,res){
	session.order.storeID=req.body.store;
	res.redirect("/order");
});

router.get('/order',function(req,res){
	/*if(!utils.defined(session, 'order','storeID')){
		console.log("Must enter a storeID first.");
		res.redirect('/store');
	}else{*/
		res.sendFile(path+'order.html');
	//}
});

router.get('/order/categories',function(req,res){
	//var storeID = session.order.storeID;
	storeID=3302;
	utils.getMenu(storeID,function(storeData){
			session.storeData=storeData;
			var cats=utils.jsonCategories(storeData);
			session.cats=cats;
			res.json(cats);
		});
});

router.get('/order/getCat',function(req,res){
	utils.getItemsInCategory(req.query.rootCat,session,function(){
		console.log(data);
		res.json(data);
	});
});

router.post('/order',function(req,res){
	try{
		session.items = JSON.parse(req.body.items);
		console.log(session.items);
		res.redirect('/dash');
	}catch(e){
		console.log("Bad order entry" + e);
	}
});

router.get('/dash',function(req,res){
	res.sendFile(path+'MAC.html');
});

router.post('/dash',function(req,res){
	session.dashMacAddress = req.body.dashMacAddress;
	res.redirect('/review');
});


router.get("*",function(req,res){
  res.sendFile(path + "index.html");
})



module.exports.router=router;
module.exports.session=function getSession(){return session;}
