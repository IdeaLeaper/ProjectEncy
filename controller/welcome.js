App.controller('welcome',function(page){
	$(page).find(".app-welcome .btn").clickable();
	$(page).find(".u-enter").on('click',function(){
		App.load('login');
	});
});