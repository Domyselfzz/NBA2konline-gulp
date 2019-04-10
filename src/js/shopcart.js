require(["require.config"],function(){
    require(["jquery","template","header","footer","fixednav"],function($,template){
        class Shopcart{
            constructor(container){
                this.container = container;
                this.render();
            }
            render(){
                //渲染列表
                let data = localStorage.getItem("cart");
                if(data){
                    data = JSON.parse(data);
                    this.container.html(template("cart-list",{list: data}));
                }  
                // 绑定事件
                console.log( $(".icon-checked"));
                $(".icon-checked").toggle(
                    function () {
                        // console.log(1111);
                      $(this).addClass("selected");
                    },
                    function () {
                      $(this).removeClass("selected");
                    }
                  );
            }

        }
        new Shopcart($("#table-container"));
    })
})