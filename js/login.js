module.exports={
	toLogin:function(userID,password,type){
//		alert("dadasdasdsa")
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				"status":"login",
				"userID":userID,
				"password":password
			},
			beforeSend:function(){

			},
			success:function(data){
				var Toast = require("./toast");
				console.log(data);
				if(data == "0"){
					//alert("用户名不存在");
					Toast.makeText("用户名不存在",3000);
				}else if(data=="2"){
					//alert("密码错误");
					Toast.makeText("密码错误",3000);
				}else{
					localStorage.setItem("isLogin","ok");
					localStorage.setItem("userID",userID);

					if(type == "user"){
						var user = require("./user");
						console.log("user")

						user.loadUserHeader();
						user.loadUserContent();

					}else if(type == "home"){

						var home=require("./home.js");
						home.loadHomeHeader();
						home.loadHomeContent();
						$("#foot li").eq(0).addClass("active").siblings().removeClass("active");

					}else if(type == "cart"){
						//var Cart = require("./Cart");
						//Cart.loadCartHeader();
						//Cart.loadCartContent();
					}
				}
			}
		});
	},
	loadLoginHeader:function(type){
		// $("head").append('<script type="text/javascript" src="//at.alicdn.com/t/font_ineu2dcxklc8fr.js"></script>');
		$("head").append('<link rel="stylesheet" href="//at.alicdn.com/t/font_ineu2dcxklc8fr.css" />');
		$("#header").load("./html/login.html #loginHeader",function(){
			//console.log("login");
			$("#back").tap(function () {
				var home=require("./home.js");
				home.loadHomeHeader();
				home.loadHomeContent();
				$("#foot li").eq(0).addClass("active").siblings().removeClass("active");
			})
		});
	},
	loadLoginContent:function(){
		var that = this;
		$("#content").load("./html/login.html #loginContent",function(){
			//console.log("ok");
			var validity = require("./validity");
			//console.log(validity.getRandomNum());

			$(".code").html(validity.getRandomNum());

			$("#login").tap(function(){

				var userID = $("#userID").val();
				var password = $("#password").val();
				var code = $("#code").val().toLowerCase();
				var codeRandom = $(".code").html().toLowerCase();
				if(validity.validityUserID(userID)&&validity.validityPassword(password)&&validity.validityCode(code,codeRandom)){
					that.toLogin(userID,password,"user");
				}

			});
			$(".register").tap(function () {
				var register= require("./register");
				register.loadRegisterHeader();
				register.loadRegisterContent();
			});
			$(".code").tap(function () {
				//console.log(111)
				$(this).html(validity.getRandomNum());
			})
		});
	},
	loadLoginFoot:function(){
		$("#footer").load("./html/login.html #loginFoot",function(){
			console.log("ok");
		});
	}
};