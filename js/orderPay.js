module.exports={
	loadOrderPay:function(){
		$("#orderMain").load("./html/orderPay.html #orderPay", function() {
			console.log("orderPay");
			var totalPrice=localStorage.getItem("totalPrice");
			$("#prices").html("总计："+totalPrice);
		});
	}
}
