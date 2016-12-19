module.exports = {
	loadMakeHeader: function() {
		$("#header").load("./html/make.html #makeHeader", function() {
			//console.log("ok");
			$("#back").on("tap", function() {
				var home = require("./home.js");
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
				var makeDingdan = require("./makeDingdan.js");
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