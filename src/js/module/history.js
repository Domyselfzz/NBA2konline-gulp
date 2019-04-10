define(["jquery","template"],($,template) => {
    function History (container,url,listData){
        this.container = container;
        this.url = url;
        this.listData = listData;
        this.load();
    }
    // jquery提供的用来合并对象的方法
    $.extend(History.prototype,{
        load : function () {
                this.container.load("/html/module/history.html",() =>{
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
            // console.log(this);
            $.get(this.url, res => {
                if(res.res_code === 1){
                    // console.log(res.res_body.list);
                    this.render (res.res_body.list);
                }
            })
        },
        render : function(data){
            //渲染列表
            this.container.html(template("history-list",{list: data}));
            this.goToDetail(); 
        },
        goToDetail : function(){
            //跳转到详情页
            $(".list-item").on("click",function(){
                // console.log(this);
                let id = $(this).attr("data-id");
                location.href = "/html/detail.html?id="+id;
            })
        }
    })
    return History;
})