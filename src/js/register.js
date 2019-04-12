require(["require.config"], () => {
    require(["jquery","Swiper"], ($,Swiper) => {
        class Register{
            constructor(){
                this.swiper();
                this.registerBtn();
            }
            // 轮播图
            swiper(){
                var mySwiper = new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项
                    // 自动播放
                    autoplay:true,
                    //淡入淡出
                    effect : 'fade',
                    autoplay: {
                        delay: 4000,//2秒切换一次
                      },

                  })   
            }
            registerBtn(){
                $("#submit").click(() =>{
                    location.href = "/index.html";
                })
            }
       
    }
    new Register();
})
})