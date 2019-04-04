define(["jquery","template"],($,template) =>{
    function ShopItem (container,url,listData){
        this.container = container;
        this.url = url;
        this.listData = listData;
        this.load();
    }
    // jquery提供的用来合并对象的方法
    $.extend(ShopItem.prototype,{
        load : function () {
            this.container.load("/html/module/shopItem.html",() =>{
                //判断listData是否有数据
                if(this.listData) {
                    this.render(this.listData);
                }else{
                    this.getData();
                }
            })
        },
        getData : function() {
            //请求列表数据
            $.get(this.url, res => {
                if(res.res_code === 1){
                    // console.log(res.res_body.list);
                    this.render (res.res_body.list);
                }
            })
        },
        render : function(data){
            //渲染列表
            this.container.html(template("shop-list",{list: data}));
            // console.log($(".buy-now"));
            //改“立即购买”button背景色
            $(".buy-now").each(function(){
                $(this).on("mouseover",function(){
                    // console.log("jclkasc");
                    $(this).css("background-color","#df3232");
                     
                    // $(this).attr("style","background:#df3232");
                })
                $(this).on("mouseout",() =>{
                    $(this).css("background-color","#f74a4a");
                    // $(this).attr("style","background:#f74a4a");
                })
            })
        }
    })
    return ShopItem;
})