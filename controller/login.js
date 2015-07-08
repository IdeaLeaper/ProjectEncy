App.controller('login',function(page){
	
	u.makeBack(page);
	
	/* Build tabs */
	u.makeTab(page);
	
	/* Login realization */
	$(page).find(".u-login").on('click',function(){
		var username = $(page).find(".u-login-username").val().trim();
		var password = $(page).find(".u-login-password").val().trim();
		
		if(username.empty()||password.empty()){
			plus.nativeUI.toast("missing required fields");
			return;
		}
		
		u.Loading(true, true);
		lapp.api("user.login",{
			username: username,
			password: password
		}, function(result){
			u.Loading(false);
			if(result.status == "succeed"){
				DataStorage.set("user", {
					username: username,
					user_id: result['user_id'],
					cookie: result.cookie
				});
				App.load('index');
				App.removeFromStack(0,2);
			} else {
				plus.nativeUI.toast(result.error);
			}
		}, function(xhr, type){
			u.Loading(false);
			plus.nativeUI.toast("Network error(s) occupied");
		});
		
	});
	
	/* Register realization */
	$(page).find(".u-reg").on('click',function(){
		var username = $(page).find(".u-reg-username").val().trim();
		var school = $(page).find(".u-reg-school").val().trim();
		var password = $(page).find(".u-reg-password").val().trim();
		var passwordAgain = $(page).find(".u-reg-password-again").val().trim();
		
		if(username.empty()||password.empty()||passwordAgain.empty()){
			plus.nativeUI.toast("missing required fields");
			return;
		}
		
		if(password!=passwordAgain){
			plus.nativeUI.toast("Passwords inconsistent");
			return;
		}
		
		u.Loading(true, true);
		
		lapp.api("user.create",{
			username: username,
			password: password,
			school: school
		}, function(result){
			u.Loading(false);
			if(result.status == "succeed"){
				DataStorage.set("user", {
					username: username,
					user_id: result['user_id'],
					cookie: result.cookie
				});
				App.load('index');
				App.removeFromStack(0,2);
			} else {
				plus.nativeUI.toast(result.error);
			}
		}, function(xhr, type){
			u.Loading(false);
			plus.nativeUI.toast("Network error(s) occupied");
		});
	});
	
	$(page).find(".u-adapter").on('click', function(){
		App.load("adapter");
	});
	
});
