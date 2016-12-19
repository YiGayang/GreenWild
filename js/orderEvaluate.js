module.exports={
	loadOrderEvaluate:function(){
		$("#orderMain").load("./html/orderEvaluate.html #orderEvaluate", function() {
			console.log("orderEvaluate");
		});
	}
}