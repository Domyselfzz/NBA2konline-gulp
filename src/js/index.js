require(["require.config"],function(){
    require(["jquery","template","Swiper","shopItem","url","Toprank","footer","header","fixednav"],function($,template,Swiper,ShopItem,url){
        class Index{
            constructor(){
				
				this.init();
				this.list();
			}
			init(){
				this.swiper();
				
			}
            swiper () {
				var mySwiper = new Swiper ('.swiper-container', {
					// direction: 'vertical', // 垂直切换选项
					loop: true, // 循环模式选项
					//自动播放
					autoplay:true,
					
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
        }
        new Index();
    })
})