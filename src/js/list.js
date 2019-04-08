require(["require.config"],function(){
    require(["jquery","template","url","toprank","shopItem","header","footer","fixednav"],function($,template,url,Toprank,ShopItem){
        class List{
            constructor(){
                this.init();
            }
            init(){
                this.toprank();
                this.list();
            }
            toprank(){
                // 请求热门排行数据
				// console.log($("#toprankContainer"));
				new Toprank($("#toprankContainer"),url.baseUrl + "list-toprank");
            }
            list(){
				//请求商品数据
				// console.log(url);
				// console.log(ShopItem);
				new ShopItem($("#hotListContainer"),url.baseUrl + "list-goods");
			}
        }
        new List();
    })
})