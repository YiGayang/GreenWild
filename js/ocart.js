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