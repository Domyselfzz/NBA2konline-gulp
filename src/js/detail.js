require(["require.config"],function(){
    require(["jquery","template","url","toprank","header","footer","fixednav"],function($,template,url,Toprank){
        class Detail{
            constructor(){
                this.init();
               
            }
            init(){
                this.toprank();
            }
            toprank(){
                // 请求历史数据
                new Toprank($("#historyContainer"),url.baseUrl + "history");                
            
            }
           
           
                
         
      
        }
        new Detail();
    })
})