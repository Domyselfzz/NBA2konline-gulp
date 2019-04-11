require(["require.config"],function(){
    require(["jquery","template","header","footer","fixednav"],function($,template){
        class Shopcart{
            constructor(container){
                this.container = container;
                this.render();
            }
            render(){
                //渲染列表
                let data = localStorage.getItem("cart");
                if(data){
                    // console.log($(".cart-empty"));
                    $(".cart-empty").css("display","none");
                    data = JSON.parse(data);
                    this.sLength = data.length;
                    this.container.html(template("cart-list",{list: data}));
                }  

                // 绑定事件
                //单选
                this.check();
                //全选
                this.allcheck();
                console.log("easy");                

            }
            check(){
                this.checkLength = 0;
                var _this = this;
                $(".check").on("click",function(){
                    if($(this).get(0).className.includes("selected")){
                        _this.checkLength--;
                        $(this).removeClass("selected");
                        // console.log(_this.checkLength);
                    }else{
                        $(this).addClass("selected");
                        _this.checkLength++;
                        // console.log(_this.checkLength);
                    } 
                    if(_this.checkLength === _this.sLength){
                        $("#allcheck").addClass("selected");
                    }else{
                        $("#allcheck").removeClass("selected");
                    }
                })
            }
            allcheck(){
                var _this = this;
                $("#allcheck").on("click",function(){
                    if($(this).get(0).className.includes("selected")){
                        $(".icon-checked").get().forEach(element => {
                            _this.checkLength = 0;
                            element.classList.remove("selected");
                            // console.log(_this.checkLength);
                        });
                    }else{
                        $(".icon-checked").get().forEach(element =>{
                            _this.checkLength = _this.sLength;
                            element.classList.add("selected");
                            // console.log(_this.checkLength);                              
                        })
                    }  
                })
            }

            subtotal(){

            }

        }
        new Shopcart($("#table-container"));
    })
})