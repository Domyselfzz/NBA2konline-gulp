define(["jquery"],function($){
	class Footer{
	     constructor () {
	         this.init().then(() => {
	             this.login();
	         })
	     }
	     init(){
	         return new Promise((resolve,reject) =>{
	             $("#footer-container").load("/html/module/footer.html",() =>{
	                 resolve();
	             })
	         })
	     }
	     login(){
	        //  console.log("footer引入成功！");
	     }
	 }
	return new Footer(); 
})