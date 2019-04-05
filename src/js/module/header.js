define(["jquery"],function($){
    class Header{
        constructor () {
            this.init().then(() => {
                this.login();
            })
        }
        init(){
            return new Promise((resolve,reject) =>{
                $("#header-container").load("/html/module/header.html",() =>{
                    resolve();
                })
            })
        }
        login(){
            // console.log("header引入成功！");
            //搜索框光标获取焦点和失去焦点事件
            $("#search-text").focus(function(){
                $("#search-text").val("");
              });
            $("#search-text").blur(function(){
                $("#search-text").val("输入道具进行搜索");
              });
        }
    }
   return new Header(); 
})