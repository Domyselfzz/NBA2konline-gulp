require(["require.config"],function(){
    require(["jquery","template","header","footer","fixednav"],function($,template,header){
        class Shopcart{
            constructor(container){
                this.container = container;
                this.render();
            }
            render(){
                //渲染列表
                let data = localStorage.getItem("cart");
                data = JSON.parse(data);
                //将localStorage的购物车信息放在全局
                this.cart = data;
                if(data.length>0){
                    // console.log($(".cart-empty"));
                    $(".cart-empty").css("display","none");
                    this.sLength = data.length;
                    this.container.html(template("cart-list",{list: data}));
                }  

                // 绑定事件
                //单选
                this.check();
                //全选
                this.allcheck();
                //a标签数量编辑
                this.aEvents();
                //小计
                this.subtotal();   
                //input数量编辑
                this.goodsNumInput();           

            }
            // 单选框
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
                    _this.changeCSS();
                    _this.calcMoney(); 
                })
            }
            //全选框
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
                    _this.changeCSS(); 
                    _this.calcMoney();   
                })
            }
            // 绑定tr中操作商品信息的a标签（事件委托）
            aEvents(){
                let cart = this.cart;//this.cart已经为JSON格式
                $("#table-container").on("click","a",(event) =>{
                    var target = $(event.target);
                    target = target.get(0);
                    var tr = target.parentNode.parentNode,
                    data_id = tr.getAttribute("data-id"),
                    storageNum = 0;
                    if(target.className.includes("cart-minus")){
                        let numInput = target.nextElementSibling;
                        if(numInput.value <= 1){
                            numInput.value = 1;
                            alert("不能再减咯！！！");
                        }else{
                            numInput.value--;
                        }
                        storageNum = numInput.value*1;
                    }
                    if(target.className.includes("cart-plus")){
                        let numInput = target.previousElementSibling;
                        numInput.value++;
                        storageNum = numInput.value*1;
                    }
                    if(target.className.includes("care")){
                        if(confirm("关注成功！是否立即前往我的关注？")){
                            location.href = "javascript:;";
                        }
                    }
                    if(target.className.includes("del")){
                        let i = 0;
                        if(cart.some(function(item,index){
                            i = index;
                            return item.id == data_id;
                        })){
                            cart.splice(i,1);
                        }
                        tr.remove();
                    }
                    let j = 0;
                    if(cart.some(function(item,index){
                            j = index;
                            return item.id == data_id;
                        })){
                            if(storageNum != 0){
                                cart[j].num = storageNum;
                            }
                        }
                    localStorage.setItem("cart",JSON.stringify(cart));
                    //改变header模块购物车的商品数量
                    header.calcCartNum();
                    //切换显示购物车为空的div
                    if(cart.length>0){
                        // console.log($(".cart-empty"));
                        $(".cart-empty").css("display","none");
                    }else{
                        $(".cart-empty").css("display","block");
                    } 
                    //计算小计
                    this.subtotal();
                    // 计算总money
                    this.calcMoney();
                }) 
                
            }
            //input数量编辑
            goodsNumInput(){
                let cart = this.cart,
                    _this = this;
                    //键盘keyup事件
                $(".numIput").keyup(function(){
                    let tr = $(this).get(0).parentNode.parentNode,
                         data_id = tr.getAttribute("data-id"),
                         j = 0,
                         inputNum = Number($(this).val());
                    if(cart.some(function(item,index){
                            j = index;
                            return item.id == data_id;
                        })){
                            if(inputNum >= 1){
                                cart[j].num = inputNum;
                            }
                        }
                    localStorage.setItem("cart",JSON.stringify(cart));

                     _this.subtotal();
                     _this.calcMoney();
                })
                // input框失去焦点事件
                // $(".numInput").focusout(function(){
                //     console.log(11111);
                //     console.log($(this));
                //     if($(this).val()*1 < 1){
                //         alert("请输入大于零的数字！");
                //         $(this).val(1);
                //     }
                // })
            }
            //计算小计
            subtotal(){
                $(".subtotal").html(function(){
                    let tr = $(this).get(0).parentNode.parentNode;
                    let num;
                    num = tr.children[3].children[0].innerHTML*tr.children[5].children[1].value;
                    return num;
                })
            }
            //商品结算&计算选中的件数
            calcMoney(){
                let moneyBox = $(".allmoney"),
                    money = 0,
                    goodsnum = 0;
                    $(".check").get().forEach(element =>{
                        if(element.className.includes("selected")){
                            let tr = element.parentNode.parentNode;
                            money += Number(tr.children[7].children[0].innerHTML);
                            goodsnum += Number(tr.children[5].children[1].value);
                        }
                    })
                    moneyBox.html(money);
                    //超出结算上限，谈提示
                    $(".allchecknum").html(goodsnum);
                    if(goodsnum > 10){
                        alert("已超出最大结算数量10！请适当调整！");
                        $(".p-right").css("background","#666666");
                    }else{
                        this.changeCSS();
                    }
                    
            }
            //切换部分样式--根据选框状态
            changeCSS(){
                if($(".check").get().some(function(item){
                    return item.className.includes("selected");
                })){
                    $(".pay1").css("display","block");
                    $(".p-right").css("background","#f74a4a");
                }else{
                    $(".pay1").css("display","none");
                    $(".p-right").css("background","#666666");
                }
                
            }
            
        }
        new Shopcart($("#table-container"));
    })
})