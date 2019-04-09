require(["require.config"],function(){
    require(["jquery","template","url","history","header","footer","fixednav"],function($,template,Url,History){
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
                    //请求列表数据
                    $.get(this.url, res => {
                        if(res.res_code === 1){
                            // console.log(res.res_body.data);
                            this.render (res.res_body.data);
                        }
                    })
                }
            render(data){
                    //渲染列表
                    this.container.html(template("detail-list",{...data}));
                    this.events();
                }
            // 事件委托
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
                // $("#cart").get(0).onclick = function(){
                //     let s_id = location.search.slice(4);
                //     let obj={
                //         "id" : s_id,
                //         "name":s_name,
                //         "price":s_price,
                //         "num":1,
                //         "save":s_num
                //     };
                //     let cart = localStorage.getItem('cart');
                //     if(cart){
                //         //localStorage存在
                //         cart = JSON.parse(cart);
                //         //判断是否存在当前这条数据
                //         let i = 0;
                //         if(cart.some(function(item,index){
                //             i = index;
                //             return item.id == data_id;
                //         })){
                //             //存在当前这条数据，则num++
                //             cart[i].num++;
                //             if(cart[i].num > s_num){
                //                 cart[i].num = s_num;
                //                 alert("已达限购上限，请前往购物车查看！");
                //             }
                //         }else{
                //             //localStorage不存在当前这条数据
                //             cart.push(obj);
                //         }
                        
                //     }else{
                //         cart = [obj]
                //     }
                //     localStorage.setItem('cart',JSON.stringify(cart));
                // }
            }
           
           
           
                
         
      
        }
        new Detail($("#detail-container"),Url.baseUrl + "list-detail");
    })
})