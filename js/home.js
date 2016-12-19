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
							var AddCart = require("./AddCart");
							AddCart.addCart(userID,goodsID,1);
						}else{
							var Login = require("./login");
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


