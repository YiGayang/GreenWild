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
                var Login = require("./login");
                Login.loadLoginHeader("user");
                Login.loadLoginContent();
            });
            $("#back").on("tap",function(){
                var user= require("./user");
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
                var validity = require("./validity");
                var userID = $("#userID").val();
                var password = $("#password").val();
                var password1 = $("#password1").val();
                if(validity.validityUserID(userID)&&validity.validityPassword(password)&&validity.validityPassword2(password,password1)){
                    //进行ajax请求
                    that.toRegister(userID,password);
                    var user =require("./user");
                    user.loadUserHeader();
                    userID.loadUserContent();

                }
            });
        })
    }

}
