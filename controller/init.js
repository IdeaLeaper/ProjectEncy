if (window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
	plus.navigator.closeSplashscreen();
	
	plus.navigator.setStatusBarBackground("#2196F3");
	plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
	
	plus.key.addEventListener("backbutton",
	function() {
		if(backButtonLock == true){
			return;
		}
		u.Loading(false);
		if (App.back() == false) {
			backButtonLock = true;
			u.modal('<i class="fa fa-bell fa-fix"></i>提示', "真的要退出 Udia 吗?", true, function(ret){
				if (ret) {
					plus.runtime.quit();
				} else {
					backButtonLock = false;
				}
			});
		}
	});
	
	if(!DataStorage.exist("user")){
			App.load('welcome');
	} else {
			App.load('index');
	}
	
}