/**
 * Created by Administrator on 2016/12/17 0017.
 */
module.exports={
    validityCode:function (code1,code2) {
        var toast = require("./toast");
        if(code1!=code2){
            toast.makeText("请输入正确验证码", 3000);
            return false;
        }
        return true;

    },
    validityUserID:function(ueserID) {
        /*
         *	用户名
         *可以是字母，数字，下划线，不能以数字开头，长度在6-20之间
         * 可以是邮箱
         * 可以是手机
         */
        var toast = require("./toast");

        if(ueserID == ""){
            toast.makeText("请填写用户名", 3000);
            return false;
        }
        if(/^[A-Za-z]{1}\w{5,19}/.test(ueserID)){

            return true;
        }
        if (/^([\w\.\-]+)@([\w\-]+)\.([a-zA-Z]{2,4})$/.test(ueserID)){
            return true;
        }
        if(/^1[34578]\d{9}$/.test(ueserID)){
            return true;
        }
        toast.makeText("用户名格式错误", 3000);
        return false;


    },
    validityPassword:function(password){
        var toast = require("./toast");
        var passlength=password.length;
        if(passlength<6||passlength>20){
            toast.makeText("密码长度必须是6-20位之间",3000);
            return false;
        }
        if(/\d+/.test(password)&&/[a-zA-Z_]+/.test(password)&&/\W+/.test(password)){
            //密码级别高
            toast.makeText("密码级别高", 1000)
            return true;
        }
        if(/\d+/.test(password)&&/[a-zA-Z_]+/.test(password)){
            //密码级别中
            toast.makeText("密码级别中",1000);
            return true;
        }

        if(/\d+/.test(password)||/[a-zA-Z_]+/.test(password)){
            //密码级别低
            toast.makeText("密码级别低",1000);
            return true;
        }
        return true;
    },
    validityPassword2:function (password1,password2) {
        if(password1!=password2){
            toast.makeText("两次输入的密码不一致",3000);
            return false;
        }
        return true;
    },
    getRandomNum:function () {
        /*
         * 验证码 4位，数字或字母
         *
         * acU1    acu1  acu1
         * */
        var arr =[];//保存每个生成随机字符
        while(arr.length<4){
            //使用ascII码  数字48-57  字母65-90 97-122
            var n = getRandom(48,122);
            if((n>=48&&n<=57)||(n>=65&&n<=90)||(n>=97&&n<=122)){
                arr.push(String.fromCharCode(n));
            }
        }
        checkcodeValue = arr.join("");


        function getRandom(start,end){
            var d = end+1-start;
            return Math.floor(Math.random()*d+start);
        }
        return checkcodeValue;

    }
};



/*
 *用户名可以是字母，数字，下划线，不能以数字开头，长度在6-20之间
 */
/*
 function validateName(){

 var username = document.getElementById("username").value;
 //循环里面的每一个字符，进行判断
 for(var i in username){
 var asc = username.charCodeAt(i);

 //我们判断哪些内容是错误的
 //48-57代表0-9  65-90大写字母  97-122是小写字母 下划线95
 if(asc<48 ||(asc>57&&asc<65)||(asc>90&&asc<95)||asc==96||asc>122){
 //弹出一个提示
 toast.show("用户名输入字符不合法",3000);
 return false;
 }
 }
 //不能以数字开头
 if(username.charCodeAt(0)>=48&&username.charCodeAt(0)<=57){
 toast.show("用户名不能以数字开头",3000);
 return false;
 }

 if(username.length<6||username.length>20){
 toast.show("用户名长度必须在6-20个之间",3000);
 return false;
 }
 return true;

 }
 */
/*
 密码6-20位    111  222  --->111222
 * */
/*
 function validatePass(){
 pass1 = document.getElementById("pass1").value;
 var passlength = pass1.trim().length;
 if(passlength<6||passlength>20){
 toast.show("密码长度必须是6-20位之间",3000);
 return false;
 }
 return true;
 }
 */
/*
 验证密码级别
 纯数字或纯字母，密码级别低
 包含数字和字母的，密码级别中
 包含字母和数字，特殊字符，密码级别高
 wewew1223&
 */
/*
 function validatePassRange(){
 var pass = document.getElementById("pass1").value;
 var passRange = document.getElementById("passrange");
 if(/\d+/.test(pass)&&/[a-zA-Z_]+/.test(pass)&&/\W+/.test(pass)){
 //密码级别高
 passRange.innerHTML="密码级别高";
 return;
 }
 if(/\d+/.test(pass)&&/[a-zA-Z_]+/.test(pass)){
 //密码级别中
 passRange.innerHTML="密码级别中";
 return;
 }

 if(/\d+/.test(pass)||/[a-zA-Z_]+/.test(pass)){
 //密码级别低
 passRange.innerHTML="密码级别低";
 return;
 }
 }
 */
/*
 验证确认密码
 验证邮箱格式
 验证手机号码格式
 */
/*
 function validateOther(){

 var pass2 = document.getElementById("pass2").value;
 if(pass1!=pass2){
 toast.show("两次输入的密码不一致",3000);
 return false;
 }

 //验证邮箱
 var email = document.getElementById("email").value;
 if(!/^([\w\.\-]+)@([\w\-]+)\.([a-zA-Z]{2,4})$/.test(email)){
 toast.show("邮箱格式错误",3000);
 return false;
 }

 //验证手机号码
 var tel = document.getElementById("tel").value;
 if(!/^1[34578]\d{9}$/.test(tel)){
 toast.show("手机号码格式错误",3000);
 return false;
 }
 return true;
 }
 */
/*
 验证真实姓名，要求是2位以上
 而且不能是敏感字符 tmd
 */
/*
 function validateRealName(){

 var realname = document.getElementById("realname").value;
 if(!/.{2,}/.test(realname)){
 toast.show("姓名不能少于2位",3000);
 return false;
 }

 //敏感词库
 var sentitiveWords =["tmd","hehe","nnd","知道"];
 for(var i in sentitiveWords){
 var word = sentitiveWords[i];
 if(realname.indexOf(word)>=0){
 toast.show("姓名有敏感词",3000);
 return false;
 }
 }

 return true;
 }
 */
/*
 * 验证码 4位，数字或字母
 *
 * acU1    acu1  acu1
 * */
/*
 function createValidateCode(){

 var arr =[];//保存每个生成随机字符
 while(arr.length<4){
 //使用ascII码  数字48-57  字母65-90 97-122
 var n = getRandom(48,122);
 if((n>=48&&n<=57)||(n>=65&&n<=90)||(n>=97&&n<=122)){
 arr.push(String.fromCharCode(n));
 }
 }
 var checkcode = document.getElementById("checkcode");
 checkcodeValue = arr.join("");
 checkcode.innerHTML= checkcodeValue;

 }

 window.onload = function(){
 createValidateCode();
 }

 function getRandom(start,end){
 var d = end+1-start;
 return Math.floor(Math.random()*d+start);
 }
 */
/*
 判断验证码是否与输入一致
 */
/*
 function validateCheckCode(){
 var myCheckCode = document.getElementById("mycheckcode").value;
 if(myCheckCode.toLowerCase()!=checkcodeValue.toLowerCase()){
 toast.show("验证码输入有误",3000);
 return false;
 }
 return true;
 }


 function check(){

 if(validateName()&&validatePass()&&validateOther()&&validateRealName()&&validateCheckCode()){
 alert("注册成功");
 return true;
 }
 return false;
 }

 }*/



