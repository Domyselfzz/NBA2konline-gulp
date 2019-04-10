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
                    this.calcCartNum();
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
            //根据localStorage显示购物车数量

        }
        calcCartNum(){
            // 计算购物车的初始数量
            let cart = localStorage.getItem("cart");
            if(cart) {
                cart = JSON.parse(cart);
                // 第一种显示购物车种类 ，cart.length
                // 第二种显示总数量
                this.num = cart.reduce(function (num, prod) {
                num += prod.num;
                return num;
                }, 0);
                $("#cart-num").html("（"+this.num+"）");
            }
        }
    }
   return new Header(); 
})