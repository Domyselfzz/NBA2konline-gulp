define(["jquery"],function($){
    class Fixednav{
        constructor () {
            this.init().then( () =>{
                this.login();
            })
        }
        init(){
            return new Promise((resolve,reject) =>{
                $("#fixednav-container").load("/html/module/fixed-nav.html",() =>{
                    resolve();
                })
            })
        }
        login(){
            // console.log("fixed-nav引入成功！");
            $("#b-top").on("click",function(){
                window.scrollTo(0,0);
            })
        }
    }
    return new Fixednav();
})