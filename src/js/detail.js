require(["require.config"],function(){
    require(["jquery","template","url","history","header","footer","fixednav"],function($,template,Url,History,header){
        class Detail{
            constructor(container,url){
                this.url = url;
                this.container = container;
                this.init();
            }
            init(){
                this.history();
                this.getData();
            }
            history(){
                // 请求历史数据
                new History($("#historyContainer"),Url.baseUrl + "history");
                            
            }
            
            // 请求右侧详情数据
            getData() {
                    // 获取id，然后请求数据
                    let id = location.search.slice(4);
                    // 带着id请求详情页数据
                    $.ajax({
                    url: this.url+"?id="+id,
                    method: "GET",
                    dataType: "json",
                    success :  res => {
                        if(res.res_code === 1){
                        // 保存当前商品数据
                        this.detail = res.res_body.data;
                        // 由于rap2返回的id都一样，所以要手动的修改当前数据的id，真实开发中不用写这行代码
                        this.detail.id = id;

                        // 渲染详情页
                        this.render(res.res_body.data);
                        }
                    }
                    })
                }
            render(data){
                    //渲染列表
                    this.container.html(template("detail-list",{...data}));
                    // 绑定事件
                    this.events();
                }
            // 事件委托绑定加减“按钮”
            events(){
                // console.log(this.container);
                $(".numBox").get(0).onclick = (e) =>{
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    var numInput = $("#num").get(0);
                    // console.log(target);
                    if(target.className == "minus"){
                        numInput.value--;
                        if(numInput.value<1) numInput.value = 1;
                    }
                    if(target.className == "plus"){
                        numInput.value++;
                    }
                }
                $("#addToCart").get(0).onclick = (e) =>{
                    e = e || window.event;
                    e.preventDefault ? 
					e.preventDefault() : 
                    window.returnValue = false;
                    console.log(1111111);
                    this.addToCart();
                    header.calcCartNum();
                }
            }
            addToCart(){
                let inputNum = Number($("#num").val());
                // 存数据之前先取
                let cart = localStorage.getItem("cart");
                if(cart) {
                    cart = JSON.parse(cart);
                    // 购物车已经有数据
                    // 判断购物车里是否已经存在当前数据
                    let index;
                    if(cart.some((item, i) => {
                    index = i;
                    return item.id == this.detail.id;
                    })){
                    // 索引为index的这条数据就是当前数据
                    cart[index].num += inputNum;
                    }else{
                    // 购物车里还没有加过当前数据
                    // console.log(this.detail);
                    cart.push({...this.detail, num : inputNum});
                    }
                    localStorage.setItem("cart" , JSON.stringify(cart));
                }else{
                    localStorage.setItem("cart", JSON.stringify([
                    {...this.detail, num : inputNum}
                    ]));
                }
                // console.log(JSON.parse(localStorage.getItem("cart")));
            }
           
           
           
                
         
      
        }
        new Detail($("#detail-container"),Url.baseUrl + "list-detail");
    })
})