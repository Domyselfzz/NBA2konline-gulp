define(["jquery","template"],($,template) => {
    function Toprank (container,url,listData){
        this.container = container;
        this.url = url;
        this.listData = listData;
        this.load().then(() =>{
            this.status = 200;
        });
    }
    // jquery提供的用来合并对象的方法
    $.extend(Toprank.prototype,{
        load : function () {
            return new Promise((resolve,reject) =>{
                this.container.load("/html/module/top-rank.html",() =>{
                    //判断listData是否有数据
                    if(this.listData) {
                        this.render(this.listData);
                    }else{
                        this.getData();
                    }
                    //执行Promise成功的回调
                    resolve();
                })
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
            this.container.html(template("rank-list",{list: data})); 
        }
    })
    return Toprank;
})