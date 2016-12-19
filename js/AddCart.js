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
                var Toast = require("./toast");
                //console.log(data);
                if(data == "1"){
                    if(type == "delete"){
                        Toast.makeText("删除成功",500);
                        var Cart = require("./ocart");
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