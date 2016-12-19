module.exports={
	loadOrderHeader:function(){
		$("#header").load("./html/order.html #orderHeader",function(){
			console.log("ok");
			$("#back").tap(function(){
				var home=require("./home.js");
				home.loadHomeHeader();
				home.loadHomeContent();
				$("#foot li").eq(0).addClass("active").siblings().removeClass("active");
			});
		});
	},
	loadOrderContent:function(){
		$("#content").load("./html/order.html #orderContent",function(){
			console.log("ok");
			var ocart=require("./ocart.js");
			ocart.loadOcartContent();
			var orderEdit=require("./orderEdit.js");
			//orderEdit.loadOrderEdit();
			var orderPay=require("./orderPay.js");
			var orderEvaluate=require("./orderEvaluate.js");
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
