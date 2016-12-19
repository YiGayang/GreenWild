module.exports={
	loadUserHeader:function(){
		// $("head").append('<script type="text/javascript" src="//at.alicdn.com/t/font_ineu2dcxklc8fr.js"></script>');
		$("head").append('<link rel="stylesheet" href="//at.alicdn.com/t/font_dcmyudml33plow29.css" />');
		$("#header").load("./html/user.html #userHeader",function(){
			console.log("ok1");
			if(localStorage.getItem("isLogin")=="ok"){
				$("#back").tap(function () {
					var home= require("./home");
					home.loadHomeHeader();
					home.loadHomeContent();
					$("#foot li").eq(0).addClass("active").siblings().removeClass("active");

				});
			}else{
				var Login = require("./login");
				Login.loadLoginHeader();
				Login.loadLoginContent();
			}
		});
	},
	loadUserContent:function(){
		$("#content").load("./html/user.html #userContent",function(){
			console.log("ok");
			$(".userID").html(localStorage.getItem("userID"));
			$("#signOut").tap(function () {
				localStorage.setItem("isLogin","error");
				var Login = require("./login");
				Login.loadLoginHeader();
				Login.loadLoginContent();
			});
			$("#toOrder").tap(function () {
				var order=require("./order.js");
				order.loadOrderHeader();
				order.loadOrderContent();
			});
		});
	},
	loadUserFoot:function(){
		$("#footer").load("./html/user.html #userFoot",function(){
			console.log("ok");
		});
	}
};