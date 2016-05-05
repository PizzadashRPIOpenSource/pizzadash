var express= require("express");
var utils= require("./serverUtils.js");
var pizzapi=require("dominos");
var router = express.Router();
var path = __dirname+ '/html/';
var jsPath = __dirname+'/js';
var cssPath = __dirname+'/css';
var session = {};

router.use(function (req,res,next){
	console.log("/"+req.method);
	next();
});

router.get("/",function(req,res){
	res.sendFile(path+'index.html');
});

router.get('*.js',function(req,res){
	res.sendFile(jsPath+req.path);
});

router.get('*.css',function(req,res){
	res.sendFile(cssPath+req.path);
});

router.get("/store",function(req,res){
	res.sendFile(path+'storePicker.html');
});

router.get("/store/find",function(req,res){
	var zip = session.order.customer.address.PostalCode;
	//zip='12180';
	utils.getStores(zip,function(storeData){
		res.json(storeData.result.Stores);
	})
});

router.post("/store",function(req,res){
	session.order.storeID=req.body.store;
	res.redirect("/order");
});

router.get("/customer",function(req,res){
	res.sendFile(path+'PersonalInformation.html');
});

router.post("/customer",function(req,res){
	session.order={};
	session.order.customer={};
	session.order.customer.firstName=req.body.firstname;
	session.order.customer.lastName=req.body.lastname;
	session.order.customer.address={};
	session.order.customer.address.Street=req.body.streetaddress;
	session.order.customer.address.City=req.body.city;
	session.order.customer.address.Region=req.body.state;
	session.order.customer.address.PostalCode=req.body.zip;
	session.order.customer.email=req.body.email;
	session.order.customer.phone=req.body.phone;
	res.redirect('/billing');
});

router.get("/billing",function(req,res){
	res.sendFile(path+'CreditCardInfo.html');
});

router.post("/billing",function(req,res){
	session.cardNum=req.body.cardNum;
	session.cardExp=req.body.cardExp;
	session.cardSec=req.body.cardSec;
	session.cardPost=req.body.cardPost;
	console.log(session);
	console.log(session.order.customer.address);
	res.redirect("/store");
});

router.get('/order',function(req,res){
	res.sendFile(path+'order.html');
});

router.get('/order/categories',function(req,res){
	//utils.getMenu(session.order.storeID,
	utils.getMenu(3302,function(storeData){
			//console.log(storeData.rootCategories);
			session.storeData=storeData;
			var cats=utils.jsonCategories(storeData.rootCategories);
			res.json(cats);
		});
	
});

router.get("*",function(req,res){
  res.sendFile(path + "index.html");
})



module.exports.router=router;
module.exports.session=function getSession(){return session;}
