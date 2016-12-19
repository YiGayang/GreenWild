var home=require("./home.js");
var make=require("./make.js");
var order=require("./order.js");
var user=require("./user.js");



//引入我们需要的css文件
require("../sass/index.scss");

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