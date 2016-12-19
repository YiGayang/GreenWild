module.exports = {
	loadmakeDingdanHeader: function() {
		$("#header").load("./html/makeDingdan.html #makeDingdanHeader", function() {
			//console.log("ok");

			$("#back").on("tap", function() {
				var make = require("./make.js");
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
				var order = require("./order.js");
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