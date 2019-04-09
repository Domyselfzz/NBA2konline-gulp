require(["require.config"],function(){
    require(["jquery","template","url","toprank","header","footer","fixednav"],function($,template,Url,Toprank){
        class Detail{
            constructor(container,url){
                this.url = url;
                this.container = container;
                this.init();
            }
            init(){
                this.toprank();
                this.getData();
            }
            toprank(){
                // 请求历史数据
                new Toprank($("#historyContainer"),Url.baseUrl + "history");
                // this.adjust();                
            }
            // adjust(){
            //     if(Toprank.status === 200){
            //         console.log($("#rm-title"));
            //     }
            // }
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
                    
                }
           
           
           
                
         
      
        }
        new Detail($("#detail-container"),Url.baseUrl + "list-detail");
    })
})