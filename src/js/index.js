require(["require.config"],function(){
    require(["jquery","template","Swiper","shopItem","url","toprank","notice","footer","header","fixednav"],function($,template,Swiper,ShopItem,url,Toprank,Notice){
        class Index{
            constructor(){
				
				this.init();
				
			}
			init(){
				this.swiper();
				this.list();
				this.toprank();
				this.notice();
			}
            swiper () {
				var mySwiper = new Swiper ('.swiper-container', {
					// direction: 'vertical', // 垂直切换选项
					loop: true, // 循环模式选项
					//自动播放
					autoplay:{
						delay: 2000,
					},
					
					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination',
						clickable :true,
						renderBullet: function (index, className) {
							var text;
							switch(index){
								case 0:text='周周送礼';break;
								case 1:text='掌上道聚城礼包';break;
								case 2:text='聚豆乐园全新上线';break;
							  }
							  return '<span class="' + className + '">' + text + '</span>';
						},
					},
				})
				//鼠标覆盖停止自动切换
				mySwiper.el.onmouseenter = function(){
					mySwiper.autoplay.stop();
				}
				mySwiper.el.onmouseleave = function(){
					mySwiper.autoplay.start();
				}
			}
			list (){
				//请求热卖数据
				// console.log(url);
				// console.log(ShopItem);
				new ShopItem($("#hotListContainer"),url.baseUrl + "hotgoods");
			}
			toprank(){
				// 请求热门排行数据
				// console.log($("#toprankContainer"));
				new Toprank($("#toprankContainer"),url.baseUrl + "toprank");
			}
			notice(){
				new Notice($("#notice-container"),url.baseUrl + "noticelist");
			}
        }
        new Index();
    })
})