/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var home=__webpack_require__(1);
	var make=__webpack_require__(14);
	var order=__webpack_require__(7);
	var user=__webpack_require__(6);



	//引入我们需要的css文件
	__webpack_require__(16);

	home.loadHomeHeader();
	home.loadHomeContent();


	/*make.loadMakeHeader();
	 make.loadMakeContent();*/
	/*order.loadOrderHeader();
	 order.loadOrderContent();*/
	/*user.loadUserHeader();
	 user.loadUserContent();*/
	//点击底部导航显示不同的区域---------路由
	$("#foot").on("tap","li",function(){
	    var $index=$(this).index();
	    $(this).addClass("active").siblings().removeClass("active");
	    switch($index){
	        case 0:
	            home.loadHomeHeader();
	            home.loadHomeContent();
	            break;
	        case 1:
	            make.loadMakeHeader();
	            make.loadMakeContent();
	            //that.loadFoot();
	            break;
	        case 2:
	            order.loadOrderHeader();
	            order.loadOrderContent();
	            break;
	        case 3:
	            user.loadUserHeader();
	            user.loadUserContent();
	            break;
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={
		loadHomeHeader:function(){
			$("#header").load("./html/home.html #homeHeader",function(){
				console.log("ok");
			});
		},
		loadHomeContent:function(){
			$("#content").load("./html/home.html #homeContent",function(){
				console.log("ok");
				$.ajax({
					type:"get",
					url:"data/index.json",
					success:function(data){
	//					console.log(data);
					var banner = data.banner;
	//				console.log(banner)	
					var len = banner.length;
	//				console.log(len);
					for(var i=0;i<len;i++){
						$("#bannerWrapper").append('<div class="swiper-slide">'+
					'<img src="'+banner[i].img+'" alt="" />'+
					'</div>')
					}
					var Myswiper = new Swiper('#homerBanner',{
						loop: true,
				    	autoplayDisableOnInteraction : false,
				    	autoplay:1000,
				    	pagination: '.swiper-pagination'
					})
					}
				});
				$.ajax({
				 	type:"get",
				 	url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
				 	dataType:"jsonp",
				 	beforeSend:function (){
				 		
				 	},
				 	success:function(data){
	//			 		console.log("proList",data);
	//			 		console.log(data[0]);
				 		for(var i in data){
				 			var name = data[i].goodsName;
				 			var goodsListImg = data[i].goodsListImg;
				 			var price = data[i].price;
				 			var discount = data[i].discount;
				 			var goodsID = data[i].goodsID;
				 			var newPrice = 0;
				 			if(discount=="0"){
				 				newPrice = price;
				 				discount = "不打";
				 			}else{
				 				newPrice = (price*discount/10).toFixed(1);
				 			}
				 			$("#proList").append('<li class="proItem" goodsID="'+goodsID+'">'+
								'<div class="proImg">'+
									'<img src="'+goodsListImg+'"/>'+
								'</div>'+
								'<div class="proInfo">'+
									'<p>'+name+'</p>'+
									'<p><span>￥<b>'+newPrice+'</b></span> <del>￥'+price+'</del></p>'+
									'<p>'+discount+'折</p>'+
									'<span class="cartBtn" goodsID="'+goodsID+'"><i class="iconfont">&#xe63f;</i></span>'+
								'</div>'+
							'</li>');
				 		}
				 		$(".cartBtn").on("tap",function(e){
				 			e.stopPropagation();
				 			var goodsID = $(this).attr("goodsID");
	//			 			alert("cart"+gooddsID);
							if(localStorage.getItem("isLogin")=="ok"){
								var userID = localStorage.getItem("userID");
								var AddCart = __webpack_require__(2);
								AddCart.addCart(userID,goodsID,1);
							}else{
								var Login = __webpack_require__(5);
								Login.loadLoginHeader("home");
								Login.loadLoginContent("home");
	//							$("#footer").find("li").eq(3).addClass("acive").siblings().removeClass("acive");
							}
				 		})
				 	}
				 }); 
			
			});
		}
		
	}




/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/12/8 0008.
	 */
	/*

	 购物车更新： http://datainfo.duapp.com/shopdata/updatecar.php
	 参数	返回值
	 userID:用户名（必须参数）	数据成功更新：1
	 goodsID:要更新的商品ID（必须参数）	数据更新失败：0
	 number:购买商品数量（0为删除该商品）
	*/
	module.exports = {
	    addCart:function (userID,goodsID,number,type) {
	        $.ajax({
	            url:"http://datainfo.duapp.com/shopdata/updatecar.php",
	            data:{
	                "userID":userID ,
	                "goodsID":goodsID,
	                "number":number
	            },
	            success:function (data) {
	                var Toast = __webpack_require__(3);
	                //console.log(data);
	                if(data == "1"){
	                    if(type == "delete"){
	                        Toast.makeText("删除成功",500);
	                        var Cart = __webpack_require__(4);
	                        Cart.loadCartHeader();
	                        Cart.loadCartContent();
	                    }else if(type == "pay"){
	                        Toast.makeText("支付成功",1000);
	                        $("#content").html("您已支付成功")
	                    }else{
	                        Toast.makeText("更新购物车成功",500);
	                    }
	                }else if(data == "0"){
	                    Toast.makeText("更新失败",1000);
	                }
	            }

	        });
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports={
		makeText:function(str,time){
			$("#toast").show();
			$("#tip").html(str);
			setTimeout(function(){
				$("#toast").hide();
			},time);
		}
		
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		loadOcartContent: function() {
			$("#orderMain").load("./html/ocart.html #orderList", function() {
				console.log("ok");
				//请求数据
				$.ajax({
					type: "get",
					dataType: "jsonp",
					url: "http://datainfo.duapp.com/shopdata/getCar.php?callback=",
					data: {
						userID: localStorage.getItem("userID")
					},
					success: function(data) {
						if(data == "0") {
							$("#orderList").html("暂无订单");
						} else {
							$("#orderList").html("");
							for(var i in data) {
								var img = data[i].goodsListImg;
								var goodsID = data[i].goodsID;
								var name = data[i].goodsName;
								var price = data[i].price;
								var tag = data[i].className;
								var number = data[i].number;
								var newPrice = 0;
								if(data[i].discount == "0") {
									newPrice = price;
								} else {
									newPrice = (price * data[i].discount / 10).toFixed(1);
								}
								$("#orderList").append('<li class="orderItem">' +
									'<div class="deleteItem" goodsID="' + goodsID + '">' +
									'删除' +
									'</div>' +
									'<div class="itemBox">' +
									'<div class="itemImg">' +
									'<img src="' + img + '" />' +
									'</div>' +
									'<div class="itemInfo">' +
									'<p>' + name + '</p>' +
									'<p>' + tag + '</p>' +
									'<p>单价：<span>￥' + newPrice + '</span></p>' +
									'<p>数量：' + number + '</p>' +
									'</div>' +
									'</div>' +
									'</li>');
							}
							
							$(".orderItem").swipeLeft(function() {
								//alert("ok");
								$(this).find(".itemBox").animate({
									"right": "0.5rem"
								}, 300).parent(".orderItem").siblings().find(".itemBox").animate({
									"right": "0rem"
								}, 300)
							});
							
							$(".orderItem").swipeRight(function() {
								$(this).find(".itemBox").animate({
									"right": "0rem"
								}, 300)
							});
							$(".deleteItem").tap(function() {
								//alert("删除");
								var userID = localStorage.getItem("userID");
								var goodsID = $(this).attr("goodsID");
								/*var addcarts = require("./addcart.js");
								addcarts.addCart(userID, goodsID, 0, "delete");*/

							})

						}
					}
				});
			})
		}

	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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
					var Toast = __webpack_require__(3);
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
							var user = __webpack_require__(6);
							console.log("user")

							user.loadUserHeader();
							user.loadUserContent();

						}else if(type == "home"){

							var home=__webpack_require__(1);
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
					var home=__webpack_require__(1);
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
				var validity = __webpack_require__(12);
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
					var register= __webpack_require__(13);
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={
		loadUserHeader:function(){
			// $("head").append('<script type="text/javascript" src="//at.alicdn.com/t/font_ineu2dcxklc8fr.js"></script>');
			$("head").append('<link rel="stylesheet" href="//at.alicdn.com/t/font_dcmyudml33plow29.css" />');
			$("#header").load("./html/user.html #userHeader",function(){
				console.log("ok1");
				if(localStorage.getItem("isLogin")=="ok"){
					$("#back").tap(function () {
						var home= __webpack_require__(1);
						home.loadHomeHeader();
						home.loadHomeContent();
						$("#foot li").eq(0).addClass("active").siblings().removeClass("active");

					});
				}else{
					var Login = __webpack_require__(5);
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
					var Login = __webpack_require__(5);
					Login.loadLoginHeader();
					Login.loadLoginContent();
				});
				$("#toOrder").tap(function () {
					var order=__webpack_require__(7);
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={
		loadOrderHeader:function(){
			$("#header").load("./html/order.html #orderHeader",function(){
				console.log("ok");
				$("#back").tap(function(){
					var home=__webpack_require__(1);
					home.loadHomeHeader();
					home.loadHomeContent();
					$("#foot li").eq(0).addClass("active").siblings().removeClass("active");
				});
			});
		},
		loadOrderContent:function(){
			$("#content").load("./html/order.html #orderContent",function(){
				console.log("ok");
				var ocart=__webpack_require__(4);
				ocart.loadOcartContent();
				var orderEdit=__webpack_require__(8);
				//orderEdit.loadOrderEdit();
				var orderPay=__webpack_require__(10);
				var orderEvaluate=__webpack_require__(11);
				$(".flowPath li").tap(function(){
					var $orderNavIdex=$(this).index();
					$(this).addClass("order_active").siblings().removeClass("order_active");
					switch ($orderNavIdex){
						case 0:
							ocart.loadOcartContent();
							break;
						case 1:
							orderEdit.loadOrderEdit();
							break;
						case 2:
							orderPay.loadOrderPay();
							break;
						case 3:
							orderEvaluate.loadOrderEvaluate();
							break;
						default:
							break;
					}

				});




			});
		}
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={
		loadOrderEdit:function(){
			$("#orderMain").load("./html/orderEdit.html #orderEditList",function(){
				console.log("orderEdit");
				//请求数据
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/getCar.php?callback=",
					data:{
						userID:localStorage.getItem("userID")
					},
					dataType:"jsonp",
					success:function(data){
						//console.log("cart",data)
						$("#orderEditList").html("")
						var totalNum = 0;
						var totalPrice = 0; 
						for (var i in data) {
							var img = data[i].goodsListImg;
							var goodsID = data[i].goodsID;
							var name = data[i].goodsName;
							var price = data[i].price;
							var number = data[i].number;
							totalNum+=number*1;
							localStorage.setItem("totalNum",totalNum);
							var newPrice = 0;
							if(data[i].discount == "0"){
								newPrice = price*1;
							}else{
								newPrice = (price*data[i].discount/10).toFixed(1);
							}
							totalPrice += number*newPrice;
							localStorage.setItem("totalPrice",totalPrice);
							$("#orderEditList").append('<li class="cartItem">'+
								'<div class="itemImg">'+
									'<img src="'+img+'"/>'+
								'</div>'+
								'<div class="itemInfo">'+
									'<p>'+name+'</p>'+
									'<p>单价：<span>￥'+newPrice+'</span></p>'+
									'<p><span class="reduce" goodsID="'+goodsID+'" newPrice="'+newPrice+'">-</span><span id="pro'+goodsID+'">'+number+'</span><span class="add" goodsID="'+goodsID+'" newPrice="'+newPrice+'">+</span></p>'+
								'</div>'+
							'</li>');
						}
						
						$(".reduce").tap(function(){
							var goodsID = $(this).attr("goodsID");
							var newPrice = $(this).attr("newPrice");
							var num = $("#pro"+goodsID).html()*1;
							if(num == 1){
								var Toast = __webpack_require__(3);
								Toast.makeText("至少选一个",1000);
							}else{
								num--;
								totalNum-=1;
								$("#pro"+goodsID).html(num);
								totalPrice -= newPrice;
								localStorage.setItem("totalNum",totalNum);
								localStorage.setItem("totalPrice",totalPrice);
								var userID = localStorage.getItem("userID");
								/*var AddCart = require("./AddCart");
								AddCart.addCart(userID,goodsID,num);*/
							}
						});
						$(".add").tap(function(){
							var newPrice = $(this).attr("newPrice");
							var goodsID = $(this).attr("goodsID");
							var num = $("#pro"+goodsID).html()*1;
							if(num == 5){
								var Toast = __webpack_require__(9);
								Toast.makeText("不能再多了",1000);
							}else{
								num++;
								totalNum-=(-1);
								$("#pro"+goodsID).html(num);
								totalPrice -= -newPrice;
								localStorage.setItem("totalNum",totalNum);
								localStorage.setItem("totalPrice",totalPrice);
								var userID = localStorage.getItem("userID");
								//var AddCart = require("./AddCart");
								//AddCart.addCart(userID,goodsID,num);
							}
						});
					}
				});
			});
		}
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports={
		makeText:function(str,time){
			$("#toast").show();
			$("#tip").html(str);
			setTimeout(function(){
				$("#toast").hide();
			},time);
		}
		
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports={
		loadOrderPay:function(){
			$("#orderMain").load("./html/orderPay.html #orderPay", function() {
				console.log("orderPay");
				var totalPrice=localStorage.getItem("totalPrice");
				$("#prices").html("总计："+totalPrice);
			});
		}
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports={
		loadOrderEvaluate:function(){
			$("#orderMain").load("./html/orderEvaluate.html #orderEvaluate", function() {
				console.log("orderEvaluate");
			});
		}
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/12/17 0017.
	 */
	module.exports={
	    validityCode:function (code1,code2) {
	        var toast = __webpack_require__(3);
	        if(code1!=code2){
	            toast.makeText("请输入正确验证码", 3000);
	            return false;
	        }
	        return true;

	    },
	    validityUserID:function(ueserID) {
	        /*
	         *	用户名
	         *可以是字母，数字，下划线，不能以数字开头，长度在6-20之间
	         * 可以是邮箱
	         * 可以是手机
	         */
	        var toast = __webpack_require__(3);

	        if(ueserID == ""){
	            toast.makeText("请填写用户名", 3000);
	            return false;
	        }
	        if(/^[A-Za-z]{1}\w{5,19}/.test(ueserID)){

	            return true;
	        }
	        if (/^([\w\.\-]+)@([\w\-]+)\.([a-zA-Z]{2,4})$/.test(ueserID)){
	            return true;
	        }
	        if(/^1[34578]\d{9}$/.test(ueserID)){
	            return true;
	        }
	        toast.makeText("用户名格式错误", 3000);
	        return false;


	    },
	    validityPassword:function(password){
	        var toast = __webpack_require__(3);
	        var passlength=password.length;
	        if(passlength<6||passlength>20){
	            toast.makeText("密码长度必须是6-20位之间",3000);
	            return false;
	        }
	        if(/\d+/.test(password)&&/[a-zA-Z_]+/.test(password)&&/\W+/.test(password)){
	            //密码级别高
	            toast.makeText("密码级别高", 1000)
	            return true;
	        }
	        if(/\d+/.test(password)&&/[a-zA-Z_]+/.test(password)){
	            //密码级别中
	            toast.makeText("密码级别中",1000);
	            return true;
	        }

	        if(/\d+/.test(password)||/[a-zA-Z_]+/.test(password)){
	            //密码级别低
	            toast.makeText("密码级别低",1000);
	            return true;
	        }
	        return true;
	    },
	    validityPassword2:function (password1,password2) {
	        if(password1!=password2){
	            toast.makeText("两次输入的密码不一致",3000);
	            return false;
	        }
	        return true;
	    },
	    getRandomNum:function () {
	        /*
	         * 验证码 4位，数字或字母
	         *
	         * acU1    acu1  acu1
	         * */
	        var arr =[];//保存每个生成随机字符
	        while(arr.length<4){
	            //使用ascII码  数字48-57  字母65-90 97-122
	            var n = getRandom(48,122);
	            if((n>=48&&n<=57)||(n>=65&&n<=90)||(n>=97&&n<=122)){
	                arr.push(String.fromCharCode(n));
	            }
	        }
	        checkcodeValue = arr.join("");


	        function getRandom(start,end){
	            var d = end+1-start;
	            return Math.floor(Math.random()*d+start);
	        }
	        return checkcodeValue;

	    }
	};



	/*
	 *用户名可以是字母，数字，下划线，不能以数字开头，长度在6-20之间
	 */
	/*
	 function validateName(){

	 var username = document.getElementById("username").value;
	 //循环里面的每一个字符，进行判断
	 for(var i in username){
	 var asc = username.charCodeAt(i);

	 //我们判断哪些内容是错误的
	 //48-57代表0-9  65-90大写字母  97-122是小写字母 下划线95
	 if(asc<48 ||(asc>57&&asc<65)||(asc>90&&asc<95)||asc==96||asc>122){
	 //弹出一个提示
	 toast.show("用户名输入字符不合法",3000);
	 return false;
	 }
	 }
	 //不能以数字开头
	 if(username.charCodeAt(0)>=48&&username.charCodeAt(0)<=57){
	 toast.show("用户名不能以数字开头",3000);
	 return false;
	 }

	 if(username.length<6||username.length>20){
	 toast.show("用户名长度必须在6-20个之间",3000);
	 return false;
	 }
	 return true;

	 }
	 */
	/*
	 密码6-20位    111  222  --->111222
	 * */
	/*
	 function validatePass(){
	 pass1 = document.getElementById("pass1").value;
	 var passlength = pass1.trim().length;
	 if(passlength<6||passlength>20){
	 toast.show("密码长度必须是6-20位之间",3000);
	 return false;
	 }
	 return true;
	 }
	 */
	/*
	 验证密码级别
	 纯数字或纯字母，密码级别低
	 包含数字和字母的，密码级别中
	 包含字母和数字，特殊字符，密码级别高
	 wewew1223&
	 */
	/*
	 function validatePassRange(){
	 var pass = document.getElementById("pass1").value;
	 var passRange = document.getElementById("passrange");
	 if(/\d+/.test(pass)&&/[a-zA-Z_]+/.test(pass)&&/\W+/.test(pass)){
	 //密码级别高
	 passRange.innerHTML="密码级别高";
	 return;
	 }
	 if(/\d+/.test(pass)&&/[a-zA-Z_]+/.test(pass)){
	 //密码级别中
	 passRange.innerHTML="密码级别中";
	 return;
	 }

	 if(/\d+/.test(pass)||/[a-zA-Z_]+/.test(pass)){
	 //密码级别低
	 passRange.innerHTML="密码级别低";
	 return;
	 }
	 }
	 */
	/*
	 验证确认密码
	 验证邮箱格式
	 验证手机号码格式
	 */
	/*
	 function validateOther(){

	 var pass2 = document.getElementById("pass2").value;
	 if(pass1!=pass2){
	 toast.show("两次输入的密码不一致",3000);
	 return false;
	 }

	 //验证邮箱
	 var email = document.getElementById("email").value;
	 if(!/^([\w\.\-]+)@([\w\-]+)\.([a-zA-Z]{2,4})$/.test(email)){
	 toast.show("邮箱格式错误",3000);
	 return false;
	 }

	 //验证手机号码
	 var tel = document.getElementById("tel").value;
	 if(!/^1[34578]\d{9}$/.test(tel)){
	 toast.show("手机号码格式错误",3000);
	 return false;
	 }
	 return true;
	 }
	 */
	/*
	 验证真实姓名，要求是2位以上
	 而且不能是敏感字符 tmd
	 */
	/*
	 function validateRealName(){

	 var realname = document.getElementById("realname").value;
	 if(!/.{2,}/.test(realname)){
	 toast.show("姓名不能少于2位",3000);
	 return false;
	 }

	 //敏感词库
	 var sentitiveWords =["tmd","hehe","nnd","知道"];
	 for(var i in sentitiveWords){
	 var word = sentitiveWords[i];
	 if(realname.indexOf(word)>=0){
	 toast.show("姓名有敏感词",3000);
	 return false;
	 }
	 }

	 return true;
	 }
	 */
	/*
	 * 验证码 4位，数字或字母
	 *
	 * acU1    acu1  acu1
	 * */
	/*
	 function createValidateCode(){

	 var arr =[];//保存每个生成随机字符
	 while(arr.length<4){
	 //使用ascII码  数字48-57  字母65-90 97-122
	 var n = getRandom(48,122);
	 if((n>=48&&n<=57)||(n>=65&&n<=90)||(n>=97&&n<=122)){
	 arr.push(String.fromCharCode(n));
	 }
	 }
	 var checkcode = document.getElementById("checkcode");
	 checkcodeValue = arr.join("");
	 checkcode.innerHTML= checkcodeValue;

	 }

	 window.onload = function(){
	 createValidateCode();
	 }

	 function getRandom(start,end){
	 var d = end+1-start;
	 return Math.floor(Math.random()*d+start);
	 }
	 */
	/*
	 判断验证码是否与输入一致
	 */
	/*
	 function validateCheckCode(){
	 var myCheckCode = document.getElementById("mycheckcode").value;
	 if(myCheckCode.toLowerCase()!=checkcodeValue.toLowerCase()){
	 toast.show("验证码输入有误",3000);
	 return false;
	 }
	 return true;
	 }


	 function check(){

	 if(validateName()&&validatePass()&&validateOther()&&validateRealName()&&validateCheckCode()){
	 alert("注册成功");
	 return true;
	 }
	 return false;
	 }

	 }*/





/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/12/12 0012.
	 */
	//var str = "我是首页";
	//module.exports = str;
	module.exports = {
	    toRegister:function(userID,password){
	//		alert("dadasdasdsa")
	        $.ajax({
	            type:"get",
	            url:"http://datainfo.duapp.com/shopdata/userinfo.php",
	            data:{
	                "status":"register",
	                "userID":userID,
	                "password":password
	            },
	            beforeSend:function(){

	            },
	            success:function(data){

	                console.log(data)
	            }
	        });
	    },
	    loadRegisterHeader:function(type){
	        $("#header").load("html/register.html #registerHeader",function(){
	            console.log("ok");
	            $(".toLoginBtn").tap(function(){
	                var Login = __webpack_require__(5);
	                Login.loadLoginHeader("user");
	                Login.loadLoginContent();
	            });
	            $("#back").on("tap",function(){
	                var user= __webpack_require__(6);
	                user.loadUserHeader("home");
	                user.loadUserContent();
	                user.loadUserFoot();
	            })
	        })
	    },
	    loadRegisterContent:function(){
	        var that = this;
	        $("#content").load("html/register.html #registerContent",function(){
	            console.log("ok");
	            $("#register").tap(function(){
	                var validity = __webpack_require__(12);
	                var userID = $("#userID").val();
	                var password = $("#password").val();
	                var password1 = $("#password1").val();
	                if(validity.validityUserID(userID)&&validity.validityPassword(password)&&validity.validityPassword2(password,password1)){
	                    //进行ajax请求
	                    that.toRegister(userID,password);
	                    var user =__webpack_require__(6);
	                    user.loadUserHeader();
	                    userID.loadUserContent();

	                }
	            });
	        })
	    }

	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadMakeHeader: function() {
			$("#header").load("./html/make.html #makeHeader", function() {
				//console.log("ok");
				$("#back").on("tap", function() {
					var home = __webpack_require__(1);
					home.loadHomeHeader();
					home.loadHomeContent();
				})
		});
		},
		loadMakeContent: function() {
			$("#content").load("./html/make.html #makeContent", function() {
				//console.log("ok");
				$(".make_listLi>li").on("tap", function() {
					var that = $(this).index();
					//alert(that)
					var makeDingdan = __webpack_require__(15);
					makeDingdan.loadmakeDingdanHeader();
					makeDingdan.loadmakeDingdanContent(that);

				})
			});
		},
		loadMakeFoot: function() {
			$("#footer").load("./html/make.html #makeFoot", function() {
				//console.log("ok");
			});
		}
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadmakeDingdanHeader: function() {
			$("#header").load("./html/makeDingdan.html #makeDingdanHeader", function() {
				//console.log("ok");

				$("#back").on("tap", function() {
					var make = __webpack_require__(14);
					make.loadMakeHeader();
					make.loadMakeContent();
					make.loadMakeFoot();
				})

			});
		},
		loadmakeDingdanContent: function(that) {
			$("#content").load("./html/makeDingdan.html #makeDingdanContent", function() {
				//console.log("ok");

				$.getJSON("make.json", function(data) {
					//alert(data[that].img)
					$("#makecase").append('<div class="makeDingdan_banner">' +
						'<img src="' + data[that].img + '">' +
						'</div>' +

						'<div class="xingzou">' +
						'<div class="xingzou-pic"><img height="30" src="' + data[that].img1 + '"></div>' +
						'<p>' + data[that].text00 + '</p>' +
						'</div>' +

						'<ul class="tubu">' +
						'<li>' +
						'<i class="iconfont">&#xe609;</i>' +
						'<div class="timeline-content">' + data[that].text1 + '</div>' +
						'</li>' +
						'<li>' +
						'<i class="iconfont">&#xe609;</i>' +
						'<div class="timeline-content">' + data[that].text2 + '</div>' +
						'</li>' +
						'<li>' +
						'<i class="iconfont">&#xe609;</i>' +
						'<div class="timeline-content">' + data[that].text3 + '</div>' +
						'</li>' +
						'</ul>' +

						'<div class="xingzou">' +
						'<div class="xingzou-pic"><img height="30" src="' + data[that].img2 + '"></div>' +
						'<p>' + data[that].text01 + '</p>' +
						'</div>' +
						'<ul class="tubu">' +
						'<li>' +
						'<i class="iconfont">&#xe609;</i>' +
						'<div class="timeline-content">' + data[that].text4 + '</div>' +
						'</li>' +
						'<li>' +
						'<i class="iconfont">&#xe609;</i>' +
						'<div class="timeline-content">' + data[that].text5 + '</div>' +
						'</li>' +
						'<li>' +
						'<i class="iconfont">&#xe609;</i>' +
						'<div class="timeline-content">' + data[that].text6 + '</div>' +
						'</li>' +
						'<li>' +
						'<i class="iconfont">&#xe609;</i>' +
						'<div class="timeline-content">' + data[that].text7 + '</div>' +
						'</li>' +
						'</ul>' +

						'<div class="xingzou">' +
						'<div class="xingzou-pic"><img height="30" src="' + data[that].img3 + '"></div>' +
						'<p>' + data[that].text02 + '</p>' +
						'</div>' +
						'<div class="tuijian">' +
						'<a href="">' + data[that].text8 + '</a>' +
						'<a href="">' + data[that].text9 + '</a>' +
						'<a href="">' + data[that].text10 + '</a>' +
						'<a href="">' + data[that].text11 + '</a>' +
						'<a href="">' + data[that].text12 + '</a>' +
						'</div>')

				});

				$("#btn110").on("tap", function() {
					var order = __webpack_require__(7);
					order.loadOrderHeader();
					order.loadOrderContent();
					//order.loadOrderFoot();
					$("#foot li").eq(2).addClass("active").siblings().removeClass("active");
					//alert("66")
					var arr = [];
					var obj = new Object();
					obj.data = $("input").eq(0).val();
					obj.renshu = $("input").eq(1).val();
					obj.yusuan = $("input").eq(2).val();
					obj.mudi = $("input").eq(3).val();
					obj.yaoqiu = $("input").eq(4).val();
					obj.qiyename = $("input").eq(4).val();
					obj.linkman = $("input").eq(6).val();
					obj.linkmanemail = $("input").eq(7).val();
					obj.linkmanetel = $("input").eq(8).val();
					arr.push(obj);
					//console.log(arr)
					localStorage.setItem("arr", JSON.stringify(arr));

				})

			});
		},
		loadmakeDingdanFoot: function() {
			$("#footer").load("./html/makeDingdan.html #makeDingdanFoot", function() {
				//console.log("ok");
			});
		}
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(21)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.26.1@css-loader/index.js!./../node_modules/.4.1.0@sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../node_modules/.0.26.1@css-loader/index.js!./../node_modules/.4.1.0@sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports


	// module
	exports.push([module.id, "body, html {\n  width: 100%;\n  height: 100%; }\n\nhtml {\n  font-size: 100px; }\n\nbody {\n  font-size: 16px;\n  display: flex;\n  flex-direction: column; }\n\n#toast {\n  position: fixed;\n  bottom: 2.5rem;\n  left: 10%;\n  width: 80%;\n  top: 70%;\n  height: 0.3rem;\n  background: rgba(0, 0, 0, 0.8);\n  border-radius: 0.1rem;\n  display: none;\n  font-size: 0.14rem; }\n  #toast #tip {\n    color: #fff;\n    line-height: 0.3rem;\n    text-align: center; }\n\n#header #homeHeader {\n  display: flex;\n  height: 0.52rem;\n  padding: 0 0.12rem;\n  align-items: center; }\n  #header #homeHeader li:nth-child(1) {\n    width: 0.65rem; }\n    #header #homeHeader li:nth-child(1) img {\n      width: 0.47rem; }\n  #header #homeHeader li:nth-child(2) {\n    width: 0.50rem;\n    color: #3dac2c; }\n  #header #homeHeader li:nth-child(3) {\n    flex: 1; }\n    #header #homeHeader li:nth-child(3) .search {\n      display: flex;\n      align-items: center;\n      background: #f3f3f3;\n      height: 0.31rem;\n      border-radius: 0.2rem; }\n      #header #homeHeader li:nth-child(3) .search input {\n        width: 1.4rem;\n        border: none;\n        background: transparent;\n        padding-left: 0.14rem;\n        outline: none;\n        font-size: 0.03rem; }\n        #header #homeHeader li:nth-child(3) .search input::-webkit-input-placeholder {\n          color: #b6b6b6; }\n      #header #homeHeader li:nth-child(3) .search i {\n        color: #b6b6b6; }\n\n#header #makeHeader {\n  width: 100%;\n  display: flex;\n  height: 0.52rem; }\n\n#header #userHeader {\n  width: 100%;\n  display: flex;\n  height: 0.52rem; }\n\n#content {\n  flex: 1;\n  overflow-y: scroll; }\n  #content #homeContent {\n    background: #f2f2f8; }\n    #content #homeContent #homerBanner {\n      width: 3.2rem; }\n      #content #homeContent #homerBanner #bannerWrapper .swiper-slide {\n        width: 100%;\n        height: 2.64rem; }\n        #content #homeContent #homerBanner #bannerWrapper .swiper-slide img {\n          width: 100%;\n          height: 100%; }\n    #content #homeContent .home-menu {\n      background: #FFFFFF;\n      padding: 0 0.12rem 0.24rem 0.12rem;\n      border-bottom: 0.01rem solid #eee; }\n      #content #homeContent .home-menu .home-menu-list {\n        width: 100%;\n        display: flex;\n        flex-wrap: wrap; }\n        #content #homeContent .home-menu .home-menu-list li {\n          padding-top: 0.24rem;\n          max-width: 0.74rem !important;\n          width: 0.74rem !important; }\n          #content #homeContent .home-menu .home-menu-list li div {\n            width: 0.32rem;\n            height: 0.33rem;\n            margin: 0 0.1rem;\n            border-radius: 20%;\n            padding: 0.11rem;\n            background: #F2F2F8; }\n            #content #homeContent .home-menu .home-menu-list li div img {\n              width: 0.32rem;\n              height: 0.33rem; }\n          #content #homeContent .home-menu .home-menu-list li p {\n            width: 100%;\n            height: 0.12rem;\n            padding-top: 0.12rem;\n            font-size: 0.03rem;\n            text-align: center; }\n          #content #homeContent .home-menu .home-menu-list li:nth-child(1) p {\n            color: #ffbe00; }\n          #content #homeContent .home-menu .home-menu-list li:nth-child(2) p {\n            color: #ddc2ff; }\n          #content #homeContent .home-menu .home-menu-list li:nth-child(3) p {\n            color: #ff98e7; }\n          #content #homeContent .home-menu .home-menu-list li:nth-child(4) p {\n            color: #c5e5c8; }\n          #content #homeContent .home-menu .home-menu-list li:nth-child(5) p {\n            color: #a9e5ff; }\n          #content #homeContent .home-menu .home-menu-list li:nth-child(6) p {\n            color: #ff7d90; }\n          #content #homeContent .home-menu .home-menu-list li:nth-child(7) p {\n            color: #a9e5ff; }\n          #content #homeContent .home-menu .home-menu-list li:nth-child(8) p {\n            color: #88e4ff; }\n    #content #homeContent .box {\n      width: 100%;\n      margin: 0.1rem 0; }\n      #content #homeContent .box .head {\n        height: 0.6rem;\n        background: #fff url(" + __webpack_require__(19) + ") no-repeat -0.3rem 0.3rem;\n        line-height: 0.6rem;\n        text-align: center; }\n      #content #homeContent .box .home-gnhd {\n        background: #FFFFFF;\n        padding: 0 0.12rem; }\n        #content #homeContent .box .home-gnhd li {\n          width: 100%;\n          margin: 0.18rem 0 0.06rem 0; }\n          #content #homeContent .box .home-gnhd li .img-box {\n            width: 100%;\n            position: relative; }\n            #content #homeContent .box .home-gnhd li .img-box img {\n              width: 100%; }\n            #content #homeContent .box .home-gnhd li .img-box .abPrice {\n              position: absolute;\n              left: 0;\n              bottom: 0;\n              width: 0.8rem;\n              height: 0.45rem;\n              padding: 0 0.12rem;\n              line-height: 0.45rem;\n              text-align: center;\n              background: rgba(0, 0, 0, 0.7);\n              color: #FFFFFF;\n              font-size: 0.12rem; }\n              #content #homeContent .box .home-gnhd li .img-box .abPrice span {\n                font-size: 0.16rem;\n                font-weight: 600; }\n          #content #homeContent .box .home-gnhd li h3 {\n            font-size: 0.14rem;\n            font-weight: 600;\n            margin-top: 0.12rem;\n            display: -webkit-box;\n            overflow: hidden;\n            white-space: normal !important;\n            text-overflow: ellipsis;\n            word-wrap: break-word;\n            -webkit-line-clamp: 1;\n            -webkit-box-orient: vertical; }\n          #content #homeContent .box .home-gnhd li p {\n            display: flex;\n            margin-top: 0.096rem;\n            font-size: 0.12rem;\n            color: #999; }\n            #content #homeContent .box .home-gnhd li p span:nth-child(1) {\n              display: block;\n              background: red;\n              color: #FFFFFF;\n              padding: 0 0.06rem;\n              margin-right: 0.12rem; }\n            #content #homeContent .box .home-gnhd li p span:nth-child(2) {\n              flex: 1; }\n      #content #homeContent .box #proList {\n        width: 100%; }\n        #content #homeContent .box #proList li {\n          position: relative;\n          width: 100%;\n          height: 1rem;\n          background: #fff;\n          display: flex; }\n          #content #homeContent .box #proList li:after {\n            content: \"\";\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            background: #000;\n            transform-origin: 0 0;\n            transform: scaleY(0.5); }\n          #content #homeContent .box #proList li .proImg {\n            width: 0.9rem;\n            height: 0.9rem;\n            margin: 0.05rem; }\n            #content #homeContent .box #proList li .proImg img {\n              width: 100%;\n              height: 100%; }\n          #content #homeContent .box #proList li .proInfo {\n            flex: 1;\n            margin-top: 0.07rem;\n            position: relative;\n            margin-right: 0.1rem; }\n            #content #homeContent .box #proList li .proInfo p {\n              width: 100%; }\n              #content #homeContent .box #proList li .proInfo p:nth-child(1) {\n                font-size: 0.14rem;\n                line-height: 0.17rem;\n                display: -webkit-box;\n                overflow: hidden;\n                white-space: normal !important;\n                text-overflow: ellipsis;\n                word-wrap: break-word;\n                -webkit-line-clamp: 2;\n                -webkit-box-orient: vertical; }\n              #content #homeContent .box #proList li .proInfo p:nth-child(2) {\n                margin-top: 0.06rem; }\n                #content #homeContent .box #proList li .proInfo p:nth-child(2) span {\n                  color: #3dac2c;\n                  font-size: 0.18rem; }\n                #content #homeContent .box #proList li .proInfo p:nth-child(2) del {\n                  color: #999;\n                  margin-left: 0.05rem; }\n              #content #homeContent .box #proList li .proInfo p:nth-child(3) {\n                margin-top: 0.04rem;\n                color: #333; }\n            #content #homeContent .box #proList li .proInfo .cartBtn {\n              position: absolute;\n              bottom: 0.1rem;\n              right: 0.1rem;\n              width: 0.6rem;\n              height: 0.3rem;\n              background: -webkit-linear-gradient(top, #92ff81, #3dac2c);\n              border-radius: 0.05rem;\n              display: flex;\n              flex-direction: column;\n              justify-content: center;\n              align-items: center;\n              color: #fff; }\n              #content #homeContent .box #proList li .proInfo .cartBtn i.iconfont {\n                font-size: 0.25rem; }\n    #content #homeContent .idx_lxfs {\n      padding: 0.11rem 0.12rem 0.12rem 0.11rem;\n      background: #FFFFFF;\n      display: flex; }\n      #content #homeContent .idx_lxfs li:nth-child(1) {\n        flex: 1; }\n        #content #homeContent .idx_lxfs li:nth-child(1) img {\n          width: 100%;\n          height: 100%; }\n      #content #homeContent .idx_lxfs li:nth-child(2) {\n        flex: 1; }\n        #content #homeContent .idx_lxfs li:nth-child(2) img {\n          width: 100%;\n          height: 50%; }\n    #content #homeContent .copyRight {\n      height: 0.54rem;\n      border-top: 0.01rem solid #dcdcdc;\n      background: #fff;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-size: 0.12rem;\n      color: #999; }\n\n#footer #foot {\n  display: flex;\n  height: 0.6rem;\n  align-items: center;\n  justify-content: space-around;\n  border-top: 0.01rem solid #999; }\n  #footer #foot li {\n    display: flex;\n    align-items: center; }\n    #footer #foot li.active {\n      color: #3dac2c; }\n    #footer #foot li .icon {\n      font-size: 0.25rem; }\n    #footer #foot li p {\n      font-size: 0.12rem;\n      margin-left: 0.08rem; }\n\n#userHeader, #loginHeader, #registerHeader {\n  width: 100%;\n  display: flex;\n  height: 0.52rem;\n  background: #f8f8f8;\n  font-family: \"Yahei Mono\"; }\n  #userHeader li, #loginHeader li, #registerHeader li {\n    text-align: center;\n    line-height: 0.52rem; }\n    #userHeader li:nth-child(1), #userHeader li:nth-child(3), #loginHeader li:nth-child(1), #loginHeader li:nth-child(3), #registerHeader li:nth-child(1), #registerHeader li:nth-child(3) {\n      width: 0.66rem;\n      color: #3dac2c;\n      line-height: 0.52rem; }\n      #userHeader li:nth-child(1) i.iconfont, #userHeader li:nth-child(3) i.iconfont, #loginHeader li:nth-child(1) i.iconfont, #loginHeader li:nth-child(3) i.iconfont, #registerHeader li:nth-child(1) i.iconfont, #registerHeader li:nth-child(3) i.iconfont {\n        font-size: 0.20rem; }\n    #userHeader li:nth-child(2), #loginHeader li:nth-child(2), #registerHeader li:nth-child(2) {\n      flex: 1; }\n\nsection {\n  display: flex; }\n  section #userContent, section #loginContent, section #registerContent {\n    font-family: \"Yahei Mono\";\n    background: #f8f8f8;\n    flex: 1; }\n    section #userContent .form, section #loginContent .form, section #registerContent .form {\n      border-top: 0.01rem #999999 solid;\n      border-bottom: 0.01rem #999999 solid; }\n      section #userContent .form p, section #loginContent .form p, section #registerContent .form p {\n        display: flex;\n        background-color: #fff;\n        padding-top: 0.05rem; }\n        section #userContent .form p i.iconfont, section #loginContent .form p i.iconfont, section #registerContent .form p i.iconfont {\n          padding: 0.1rem;\n          font-size: 0.20rem;\n          color: #aaa; }\n        section #userContent .form p input, section #loginContent .form p input, section #registerContent .form p input {\n          flex: 1;\n          border: none;\n          outline: none;\n          border-bottom: 0.01rem #999999 solid; }\n          section #userContent .form p input[name=\"code\"], section #userContent .form p input[name=\"password1\"], section #loginContent .form p input[name=\"code\"], section #loginContent .form p input[name=\"password1\"], section #registerContent .form p input[name=\"code\"], section #registerContent .form p input[name=\"password1\"] {\n            border-bottom: none; }\n        section #userContent .form p .code, section #loginContent .form p .code, section #registerContent .form p .code {\n          display: inline-block;\n          padding-right: 0.1rem;\n          height: 0.36rem;\n          background: #3dac2c;\n          width: 0.66rem;\n          line-height: 0.33rem;\n          text-align: center;\n          color: #f8f8f8; }\n    section #userContent #login, section #userContent #register, section #loginContent #login, section #loginContent #register, section #registerContent #login, section #registerContent #register {\n      font-family: \"Yahei Mono\";\n      width: 90%;\n      background: #3dac2c;\n      display: inline-block;\n      margin: 0.2rem 0 0 5%;\n      padding: 0.1rem 0;\n      border: none;\n      border-radius: 0.05rem;\n      color: #fff; }\n    section #userContent p.btn, section #loginContent p.btn, section #registerContent p.btn {\n      margin: 0.1rem 0;\n      display: flex;\n      justify-content: space-around;\n      align-items: center; }\n      section #userContent p.btn span, section #loginContent p.btn span, section #registerContent p.btn span {\n        line-height: 0.24rem;\n        height: 0.24rem;\n        font-size: 0.14rem;\n        color: #999999; }\n    section #userContent .userInfo, section #loginContent .userInfo, section #registerContent .userInfo {\n      display: flex;\n      flex-direction: column; }\n      section #userContent .userInfo .userImg, section #loginContent .userInfo .userImg, section #registerContent .userInfo .userImg {\n        height: 1rem;\n        background: url(" + __webpack_require__(20) + "); }\n      section #userContent .userInfo .userPhoto, section #loginContent .userInfo .userPhoto, section #registerContent .userInfo .userPhoto {\n        height: 0.2rem;\n        width: 0.2rem;\n        margin: 0 auto;\n        text-align: center;\n        padding: 0.1rem;\n        border-radius: 50%;\n        background: #333;\n        box-shadow: 0 0 0 0.06rem #fff;\n        position: relative;\n        top: -0.1rem; }\n        section #userContent .userInfo .userPhoto i.iconfont, section #loginContent .userInfo .userPhoto i.iconfont, section #registerContent .userInfo .userPhoto i.iconfont {\n          color: #fff; }\n      section #userContent .userInfo p, section #loginContent .userInfo p, section #registerContent .userInfo p {\n        text-align: center; }\n    section #userContent .infoList, section #loginContent .infoList, section #registerContent .infoList {\n      display: flex;\n      flex-direction: column;\n      width: 100%; }\n      section #userContent .infoList li, section #loginContent .infoList li, section #registerContent .infoList li {\n        margin: 0.1rem 0;\n        height: 0.5rem;\n        line-height: 0.5rem;\n        background: #ffffff;\n        text-indent: 1em;\n        border-top: 1px #aaaaaa solid;\n        border-bottom: 1px #aaaaaa solid;\n        display: flex;\n        justify-content: space-between; }\n        section #userContent .infoList li i.iconfont, section #loginContent .infoList li i.iconfont, section #registerContent .infoList li i.iconfont {\n          margin-right: 0.1rem; }\n        section #userContent .infoList li:nth-child(4), section #loginContent .infoList li:nth-child(4), section #registerContent .infoList li:nth-child(4) {\n          margin: 0.1rem auto;\n          width: 95%;\n          border: none; }\n          section #userContent .infoList li:nth-child(4) #signOut, section #loginContent .infoList li:nth-child(4) #signOut, section #registerContent .infoList li:nth-child(4) #signOut {\n            border-radius: 0.05rem;\n            font-size: 0.20rem;\n            color: #fff;\n            width: 100%;\n            border: none;\n            background: #3dac2c; }\n\n#orderHeader {\n  width: 100%;\n  display: flex;\n  height: 0.52rem;\n  justify-content: space-between;\n  align-items: center;\n  background: #f8f8f8; }\n  #orderHeader li:nth-child(1) {\n    font-size: 0.25rem;\n    margin-left: 0.2rem;\n    color: #3dac2c; }\n  #orderHeader li:nth-child(2) {\n    font-size: 0.16rem;\n    color: #333; }\n  #orderHeader li:nth-child(3) {\n    font-size: 0.25rem;\n    margin-right: 0.2rem;\n    color: #3dac2c; }\n\n#orderContent {\n  width: 100%;\n  height: 100%;\n  background: #f8f8f8;\n  display: flex;\n  flex-direction: column; }\n  #orderContent .flowPath {\n    height: 0.45rem;\n    width: 98%;\n    margin-left: 1%;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-bottom: 0.02rem solid #999;\n    border-top: 0.02rem solid #999;\n    box-sizing: border-box; }\n    #orderContent .flowPath .order_active {\n      background: #3dac2c;\n      color: #fff; }\n    #orderContent .flowPath li {\n      flex: 1;\n      text-align: center;\n      line-height: 0.45rem;\n      border-right: 0.01rem solid #999; }\n  #orderContent #orderMain {\n    flex: 1;\n    width: 100%;\n    overflow-y: auto;\n    overflow-x: hidden; }\n    #orderContent #orderMain #orderList {\n      width: 100%; }\n      #orderContent #orderMain #orderList .orderItem {\n        width: 96%;\n        margin-left: 2%;\n        height: 1.2rem;\n        position: relative;\n        border: 0.02rem solid #999;\n        box-sizing: border-box;\n        background: #fff;\n        margin-top: 0.1rem;\n        border-radius: 0.03rem; }\n        #orderContent #orderMain #orderList .orderItem .deleteItem {\n          position: absolute;\n          right: 0;\n          top: 0;\n          bottom: 0;\n          background: #eee;\n          width: 0.5rem;\n          line-height: 1.2rem;\n          font-size: 0.16rem;\n          color: #3dac2c;\n          text-align: center; }\n        #orderContent #orderMain #orderList .orderItem .itemBox {\n          display: flex;\n          position: absolute;\n          left: 0;\n          top: 0;\n          right: 0;\n          bottom: 0;\n          background: #fff; }\n          #orderContent #orderMain #orderList .orderItem .itemBox .itemImg {\n            width: 0.9rem;\n            height: 0.9rem;\n            margin: 0.1rem; }\n            #orderContent #orderMain #orderList .orderItem .itemBox .itemImg img {\n              width: 100%;\n              height: 100%; }\n          #orderContent #orderMain #orderList .orderItem .itemBox .itemInfo {\n            flex: 1;\n            margin-top: 0.14rem;\n            position: relative;\n            margin-right: 0.2rem; }\n          #orderContent #orderMain #orderList .orderItem .itemBox p {\n            width: 100%;\n            font-size: 0.12rem;\n            line-height: 0.2rem;\n            margin-top: 0.01rem; }\n            #orderContent #orderMain #orderList .orderItem .itemBox p:nth-child(1) {\n              display: -webkit-box;\n              overflow: hidden;\n              white-space: normal !important;\n              text-overflow: ellipsis;\n              word-wrap: break-word;\n              -webkit-line-clamp: 1;\n              -webkit-box-orient: vertical; }\n            #orderContent #orderMain #orderList .orderItem .itemBox p:nth-child(2) {\n              margin-left: 0.05rem; }\n            #orderContent #orderMain #orderList .orderItem .itemBox p:nth-child(3) {\n              margin-left: 0.05rem;\n              color: #333; }\n              #orderContent #orderMain #orderList .orderItem .itemBox p:nth-child(3) span {\n                color: #f66; }\n    #orderContent #orderMain #orderEditList {\n      width: 100%; }\n      #orderContent #orderMain #orderEditList .cartItem {\n        width: 96%;\n        margin-left: 2%;\n        height: 1.2rem;\n        border: 0.02rem solid #999;\n        box-sizing: border-box;\n        background: #fff;\n        margin-top: 0.1rem;\n        border-radius: 0.03rem;\n        display: flex; }\n      #orderContent #orderMain #orderEditList .itemImg {\n        width: 0.9rem;\n        height: 0.9rem;\n        margin: 0.05rem; }\n        #orderContent #orderMain #orderEditList .itemImg img {\n          width: 100%;\n          height: 100%; }\n      #orderContent #orderMain #orderEditList .itemInfo {\n        flex: 1;\n        height: 1.2rem;\n        margin-top: 0.05rem;\n        margin-right: 0rem;\n        display: flex;\n        flex-direction: column; }\n        #orderContent #orderMain #orderEditList .itemInfo P {\n          width: 100%;\n          height: 0.2rem;\n          font-size: 0.12rem;\n          line-height: 0.2rem;\n          margin-top: 0.01rem;\n          margin-left: 0.1rem; }\n          #orderContent #orderMain #orderEditList .itemInfo P:nth-child(1) {\n            display: -webkit-box;\n            overflow: hidden;\n            white-space: normal !important;\n            text-overflow: ellipsis;\n            word-wrap: break-word;\n            -webkit-line-clamp: 1;\n            -webkit-box-orient: vertical; }\n          #orderContent #orderMain #orderEditList .itemInfo P:nth-child(2) {\n            font-size: 0.12rem;\n            margin-top: 0.1rem;\n            margin-left: 0.2rem; }\n            #orderContent #orderMain #orderEditList .itemInfo P:nth-child(2) span {\n              color: #f66;\n              font-size: 0.16rem;\n              font-weight: bold; }\n          #orderContent #orderMain #orderEditList .itemInfo P:nth-child(3) {\n            width: 80%;\n            margin-top: 0.1rem;\n            color: #333;\n            display: flex; }\n            #orderContent #orderMain #orderEditList .itemInfo P:nth-child(3) span {\n              flex: 1;\n              height: 0.3rem;\n              font-size: 0.14rem;\n              text-align: center;\n              line-height: 0.3rem;\n              display: block;\n              border: 1px solid #ccc; }\n              #orderContent #orderMain #orderEditList .itemInfo P:nth-child(3) span:nth-child(2) {\n                border-left: 0;\n                border-right: 0;\n                font-size: 0.14rem; }\n    #orderContent #orderMain #orderPay {\n      position: relative;\n      width: 100%;\n      height: 100%;\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      #orderContent #orderMain #orderPay #prices {\n        color: #f66; }\n      #orderContent #orderMain #orderPay #pay {\n        position: absolute;\n        right: 5%;\n        bottom: 9%;\n        background: #3dac2c;\n        color: #fff;\n        border: 0; }\n\n#makeHeader, #makeDingdanHeader {\n  width: 100%;\n  display: flex;\n  height: 0.52rem;\n  background: #f8f8f8; }\n  #makeHeader li, #makeDingdanHeader li {\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n    #makeHeader li:nth-child(1), #makeHeader li:nth-child(3), #makeDingdanHeader li:nth-child(1), #makeDingdanHeader li:nth-child(3) {\n      width: 0.52rem;\n      height: 0.52rem;\n      color: #63986e; }\n      #makeHeader li:nth-child(1) i, #makeHeader li:nth-child(3) i, #makeDingdanHeader li:nth-child(1) i, #makeDingdanHeader li:nth-child(3) i {\n        font-size: 0.28rem; }\n    #makeHeader li:nth-child(2), #makeDingdanHeader li:nth-child(2) {\n      flex: 1;\n      font-size: 0.22rem; }\n\n#makeContent {\n  width: 100%;\n  height: 100%;\n  overflow-y: auto; }\n  #makeContent .make_call {\n    display: flex;\n    position: fixed;\n    bottom: 1rem;\n    right: 0.05rem; }\n    #makeContent .make_call .make_callLeft {\n      width: 1.08rem;\n      height: 0.5rem;\n      border-radius: 0.06rem;\n      background: #3dac2c;\n      margin-right: 0.08rem; }\n      #makeContent .make_call .make_callLeft p {\n        text-align: center;\n        line-height: 0.25rem; }\n    #makeContent .make_call .make_callRight {\n      width: 0.5rem;\n      height: 0.5rem;\n      background: rgba(0, 0, 0, 0.7);\n      border-radius: 0.06rem;\n      text-align: center;\n      line-height: 0.5rem; }\n      #makeContent .make_call .make_callRight i {\n        font-size: 0.3rem;\n        color: #3dac2c; }\n  #makeContent .make_banner {\n    height: 1.6rem;\n    width: 100%; }\n    #makeContent .make_banner img {\n      width: 100%;\n      height: 100%; }\n  #makeContent .make_text {\n    display: flex;\n    padding: 0.16rem 0;\n    width: 100%;\n    height: 1.52rem;\n    background: #f8f8f8; }\n    #makeContent .make_text .text_left {\n      margin: 0 0.16rem;\n      height: 100%; }\n      #makeContent .make_text .text_left img {\n        width: 0.2rem;\n        height: 100%; }\n    #makeContent .make_text .text_right {\n      margin-right: 0.16rem; }\n      #makeContent .make_text .text_right p {\n        font-size: 0.14rem;\n        color: #333;\n        line-height: 0.18rem; }\n  #makeContent .make_time {\n    height: 1.4rem;\n    position: relative; }\n    #makeContent .make_time img {\n      width: 100%;\n      height: 100%; }\n    #makeContent .make_time p {\n      width: 2.56rem;\n      height: 0.5rem;\n      position: absolute;\n      left: 0.3rem;\n      top: 0.46rem;\n      background: rgba(0, 0, 0, 0.8);\n      color: #FFFFFF;\n      font-size: 0.24rem;\n      line-height: 0.5rem;\n      text-align: center; }\n  #makeContent .make_nav p {\n    width: 100%;\n    position: relative;\n    text-align: center; }\n    #makeContent .make_nav p:before {\n      width: 100%;\n      height: 0.02rem;\n      position: absolute;\n      left: 0;\n      top: 50%;\n      margin-top: -0.01rem;\n      content: \" \";\n      background-color: #49be8a; }\n    #makeContent .make_nav p span {\n      font-size: 0.22rem;\n      display: inline-block;\n      height: 0.5rem;\n      background: #FFFFFF;\n      padding: 0 0.2rem;\n      position: relative;\n      line-height: 0.5rem; }\n  #makeContent .make_nav .make_navList {\n    display: flex; }\n    #makeContent .make_nav .make_navList li {\n      display: flex;\n      flex-direction: column;\n      flex: 1;\n      text-align: center; }\n      #makeContent .make_nav .make_navList li i {\n        display: inline-block;\n        margin: 0 auto;\n        width: 0.36rem;\n        height: 0.36rem; }\n        #makeContent .make_nav .make_navList li i img {\n          height: 100%;\n          width: 100%; }\n      #makeContent .make_nav .make_navList li span {\n        font-size: 0.14rem; }\n  #makeContent .make_list {\n    width: 100%; }\n    #makeContent .make_list p {\n      width: 100%;\n      position: relative;\n      text-align: center; }\n      #makeContent .make_list p:before {\n        width: 100%;\n        height: 0.02rem;\n        position: absolute;\n        left: 0;\n        top: 50%;\n        margin-top: -0.01rem;\n        content: \" \";\n        background-color: #49be8a; }\n      #makeContent .make_list p span {\n        font-size: 0.22rem;\n        display: inline-block;\n        height: 0.5rem;\n        background: #FFFFFF;\n        padding: 0 0.2rem;\n        position: relative;\n        line-height: 0.5rem; }\n    #makeContent .make_list img {\n      height: 100%;\n      width: 100%;\n      margin-bottom: 0.03rem; }\n\n.make_call {\n  display: flex;\n  position: fixed;\n  bottom: 1rem;\n  right: 0.05rem; }\n  .make_call .make_callLeft {\n    width: 1.08rem;\n    height: 0.5rem;\n    border-radius: 0.06rem;\n    background: #3dac2c;\n    margin-right: 0.08rem; }\n    .make_call .make_callLeft p {\n      text-align: center;\n      line-height: 0.25rem; }\n  .make_call .make_callRight {\n    width: 0.5rem;\n    height: 0.5rem;\n    background: rgba(0, 0, 0, 0.7);\n    border-radius: 0.06rem;\n    text-align: center;\n    line-height: 0.5rem; }\n    .make_call .make_callRight i {\n      font-size: 0.3rem;\n      color: #3dac2c; }\n\n#makeDingdanContent {\n  width: 100%;\n  height: 100%;\n  overflow-y: auto; }\n  #makeDingdanContent .makeDingdan_banner {\n    height: 1.6rem;\n    width: 100%; }\n    #makeDingdanContent .makeDingdan_banner img {\n      width: 100%;\n      height: 100%; }\n  #makeDingdanContent .xingzou {\n    height: 0.66rem;\n    line-height: 0.66rem;\n    display: flex;\n    color: #37cf94; }\n    #makeDingdanContent .xingzou .xingzou-pic {\n      height: 0.3rem;\n      width: 0.3rem;\n      margin: 0.18rem; }\n  #makeDingdanContent .tubu {\n    font-size: 0.14rem; }\n    #makeDingdanContent .tubu li {\n      display: flex;\n      position: relative;\n      margin: 0 0.23rem;\n      line-height: 0.22rem;\n      margin-bottom: 0.16rem; }\n      #makeDingdanContent .tubu li i {\n        margin-right: 0.23rem;\n        color: #37cf94; }\n  #makeDingdanContent .tuijian {\n    margin: 0 0.23rem 0.44rem; }\n    #makeDingdanContent .tuijian a {\n      display: inline-block;\n      padding: 0.04rem;\n      background: #37cf94;\n      color: #FFFFFF;\n      margin: 0.05rem 0.05rem;\n      font-size: 0.14rem; }\n  #makeDingdanContent .makeDingdan_jieshao {\n    width: 100%; }\n    #makeDingdanContent .makeDingdan_jieshao img {\n      width: 100%; }\n  #makeDingdanContent .makeDingdan_xinxi {\n    width: 100%; }\n    #makeDingdanContent .makeDingdan_xinxi p {\n      text-indent: 0.15rem;\n      width: 100%;\n      height: 0.44rem;\n      background: #f6f6f6;\n      line-height: 0.44rem; }\n    #makeDingdanContent .makeDingdan_xinxi input {\n      width: 100%;\n      height: 0.48rem;\n      border: 0;\n      line-height: 0.48rem;\n      text-indent: 0.15rem;\n      border-bottom: 0.01rem solid #f6f6f6; }\n    #makeDingdanContent .makeDingdan_xinxi .input {\n      text-indent: 0.1rem; }\n    #makeDingdanContent .makeDingdan_xinxi button {\n      width: 94%;\n      height: 0.48rem;\n      margin: 0.1rem 3%;\n      background: #3dac2c;\n      border-radius: 0.06rem;\n      color: #FFFFFF; }\n\n@font-face {\n  font-family: 'iconfont';\n  /* project id 200026 */\n  src: url(\"//at.alicdn.com/t/font_0qq7g0z9ac5idx6r.eot\");\n  src: url(\"//at.alicdn.com/t/font_0qq7g0z9ac5idx6r.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_0qq7g0z9ac5idx6r.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_0qq7g0z9ac5idx6r.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_0qq7g0z9ac5idx6r.svg#iconfont\") format(\"svg\"); }\n\n.iconfont {\n  font-family: \"iconfont\" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale; }\n\n/*\r\n@font-face {\r\n  font-family: 'iconfont';  !* project id 200184 *!\r\n  src: url('//at.alicdn.com/t/font_z1ckdq9jdpxh6w29.eot');\r\n  src: url('//at.alicdn.com/t/font_z1ckdq9jdpxh6w29.eot?#iefix') format('embedded-opentype'),\r\n  url('//at.alicdn.com/t/font_z1ckdq9jdpxh6w29.woff') format('woff'),\r\n  url('//at.alicdn.com/t/font_z1ckdq9jdpxh6w29.ttf') format('truetype'),\r\n  url('//at.alicdn.com/t/font_z1ckdq9jdpxh6w29.svg#iconfont') format('svg');\r\n}\r\n\r\n.iconfont{\r\n  font-family:\"iconfont\" !important;\r\n  font-size:16px;font-style:normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -webkit-text-stroke-width: 0.2px;\r\n  -moz-osx-font-smoothing: grayscale;}*/\n", ""]);

	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYcAAAACCAYAAACzFBChAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5ZTlmMmM3My0xNzBiLThmNDQtOTUwNi1lNGUwZTliN2Y3YTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzkwRjYzMjk3NkYzMTFFNkI3NThFMEI0NDAxRUE4NjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzkwRjYzMjg3NkYzMTFFNkI3NThFMEI0NDAxRUE4NjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdmZDdjMzBiLTc1NmItNjI0MC1iMGU3LTJkZDg4ZjEyZDQ4ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ZTlmMmM3My0xNzBiLThmNDQtOTUwNi1lNGUwZTliN2Y3YTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4hAqVyAAAAQklEQVR42mJ89+7df4ZRMGiAq6srpUYwnjlzZjQgRwHdgImJCYxJUVmye/fu0cAcRIBpNAhGwSgYBaNgFKADgAADAHMLCs0F4aqRAAAAAElFTkSuQmCC"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "7c9495c8c2912ea16c061d21aa529f51.jpg";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);