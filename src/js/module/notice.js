define(["jquery","template"],($,template) =>{
    class Notice{
        constructor(container,url,listData){
            this.container = container;
            this.url = url;
            this.listData = listData;
            this.load();
        }
        load () {
            this.container.load("/html/module/notice.html",() =>{
                //判断listData是否有数据
                if(this.listData) {
                    this.render(this.listData);
                }else{
                    this.getData();
                }
            })
        }
        getData() {
            //请求列表数据
            // console.log(this);
            $.get(this.url, res => {
                if(res.res_code === 1){
                    // console.log(res.res_body.list);
                    this.render (res.res_body.list);
                }
            })
        }
        render(data){
            //渲染列表
            this.container.html(template("notice-list",{list: data})); 
        }
    }
    return Notice;
})