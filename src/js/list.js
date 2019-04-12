require(["require.config"],function(){
    require(["jquery","template","url","toprank","shopItem","header","footer","fixednav"],function($,template,url,Toprank,ShopItem){
        class List{
            constructor(){
                this.init();
            }
            init(){
                this.toprank();
                this.list();
                this.priceBtn();
                this.salesBtn();
            }
            toprank(){
                // 请求热门排行数据
				// console.log($("#toprankContainer"));
				new Toprank($("#toprankContainer"),url.baseUrl + "list-toprank");
            }
            list(){
				//请求商品数据    
				new ShopItem($("#hotListContainer"),url.baseUrl + "list-goods");
            }
            salesBtn(){
                let i = 0
                $("#salsBtn").on("click",function(){
                    $(this).css("color","#f74a4a");
                    i++;
                    if(i%2 === 0){
                        $("#s-gt").attr("style","background-position:-25px -71px");
                    }else{
                        $("#s-gt").attr("style","background-position:-40px -71px");
                    }
                    new ShopItem($("#hotListContainer"),url.baseUrl + "list-goods");
                })   
            }
            priceBtn () {
                // 排序
                let i = 0;
                $("#priceBtn").on("click", function () {
                    $(this).css("color","#f74a4a");
                  i++;
                  if(i%2 != 0){
                    //   console.log($("#p-gt"));
                      $("#p-gt").attr("style","background-position:-25px -71px");
                    new Promise(resolve => {
                        $.get(url.baseUrl+"list-goods", res => {
                          if(res.res_code === 1){
                            resolve(res.res_body.list);
                          }
                        })
                      }).then(list => {
                        // 升序
                        list = list.sort((a,b) => {
                          return a.qprice-b.qprice;
                        })
                        new ShopItem($("#hotListContainer"),"",list);
                      })
                  }else{
                    $("#p-gt").attr("style","background-position:-40px -71px");
                    new Promise(resolve => {
                        $.get(url.baseUrl+"list-goods", res => {
                          if(res.res_code === 1){
                            resolve(res.res_body.list);
                          }
                        })
                      }).then(list => {
                        // 降序
                        list = list.sort((a,b) => {
                          return b.qprice-a.qprice;
                        })
                        new ShopItem($("#hotListContainer"),"",list);
                      })
                  }
                  
                  
                })
              }
        }
        new List();
    })
})