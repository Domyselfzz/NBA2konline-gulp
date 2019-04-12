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
            //搜索框光标获取焦点和失去焦点事件
            $("#search-text").focus(function(){
                $("#search-text").val("");
              });
            $("#search-text").blur(function(){
                $("#search-text").val("输入道具进行搜索");
              });
            //跳转购物车页面
            $("#cart").on("click",() =>{
                this.user = tools.cookie("user");
                if(this.user){
                    location.href = "/html/shopcart.html";
                }else{
                    $("#cart-num").html("（"+0+"）");
                    if(confirm("您还未登录！是否前往登录？")){
                        this.loginOn();
                    }
                }
                
            })
            // 判断登录状态，切换显示
            this.loadstatus();
            //计算购物车数量
            this.calcCartNum();
            //退出登录按钮，切换显示
            this.exitBtn();
            //点击登录,加载登录模态框
            // console.log($(".onload"));
            $(".onload").on("click",() =>{
                this.loginOn();
            })

        }
        //点击登录,加载登录模态框
        loginOn(){
            let _this = this;
                $("#loginBox").load("/html/module/login-qq.html",function(){
                   $(this).css({"width": $(window).width(),"height": $(window).height(),"display":"block"});
                    $(".closebtn").click(() =>{
                        $(this).css("display","none");
                    })
                    //执行登录按钮操作
                    _this.loadBtn();
                })
        }
        //用户信息存cookie
        loadBtn(){
            $("#login-btn").on("click",() =>{
                //模拟登录成功
                $("#loginBox").css("display","none");
                tools.cookie("user",$("#username").val(),{path:"/"});
                alert("登陆成功！");
                window.location.reload();
            })
        }
        loadstatus(){
            let user = tools.cookie("user");
            this.user = user;
            if(user){
                $("#user").html(user);
                $("#noloading").css("display","none");
                $(".onload").css("display","none");
                $("#loading").css("display","inline-block");
            } 
        }
        exitBtn(){
            $("#loginout").on("click",() =>{
                tools.cookie("user","",{path:"/",expier:"-1"});
                $("#noloading").css("display","inline-block");
                $(".onload").css("display","inline-block");
                $("#loading").css("display","none");
            })
        }
        calcCartNum(){
            // 计算购物车的初始数量
            if(this.user){
                let cart = localStorage.getItem("cart");
                if(cart) {
                    cart = JSON.parse(cart);
                    // 第一种显示购物车种类 ，cart.length
                    // 第二种显示总数量
                    let num = cart.reduce(function (num, prod) {
                    num += prod.num;
                    return num;
                    }, 0);
                    $("#cart-num").html("（"+num+"）");
                 }
            }
            
        }
    }
   return new Header(); 
})