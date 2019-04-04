define(["jquery","template"],function(){
    class Toprank{
        constructor(container,url,listData){
            this.container = container;
            this.url = url;
            this.listData = listData;
        }
        // jquery提供的用来合并对象的方法
        // $.extend(Toprank.prototype,{
        //     //加载渲染
        //     load :function(){
        //         this.container.load("/html/module/top-rank.html",() =>{
        //             //判断listData是否存在
        //             if(this.listData){
        //                 this.render(this.listData);
        //             }else{
        //                 this.getData();
        //             }
        //         })
        //     },
        //     //请求数据
        //     getData ：function(){
        //         $get(this.url,res => {
        //             if(res.res_code === 1){
        //                 this.render(res.res_body.list);
        //             }
        //         })
        //     },
        //     // 渲染列表
        //     render : function(data){
        //       this.container.html(template("rank-list",{list: data}));  
        //     }
        // })

    }
    return Toprank;
})