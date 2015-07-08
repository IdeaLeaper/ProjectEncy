App.controller('myCenter',function(page){
	u.makeBack(page);
	
	function getUser(){
		lapp.api("user.get",{
			cookie: DataStorage.get("user", "cookie")
		}, function(result){
			if(result.status == "succeed"){
				u.templete(page, {
					"coin": result.coin,
					"school": result.school
				})
			} else {
				plus.nativeUI.toast(result.error);
			}
		}, function(xhr, type){
			plus.nativeUI.toast("Network error(s) occupied");
		});
	}
	
	
	var pageNow;
	function loadIndex(update, mode){
		if(!update){
			var pageNum = 1;
			if(mode != true){
				u.Loading(true);
			} else {
				loading = true;
			}
		} else {
			var pageNum = update;
			$(page).find(".u-loadmore").prop('disabled', true);
			$(page).find(".u-loadmore").html(u.btnProcess(true));
		}
		
		lapp.api("thread.user",{
			page: pageNum,
			user_id: DataStorage.get("user", "user_id")
		}, function(result){
			pageNow = result.pagenow;
					
					if(pageNow != result.pages) {
						$(page).find(".u-loadmore").show();
					} else {
						$(page).find(".u-loadmore").hide();
					}
					
					if(!update){
						$(page).find(".u-list").empty();
					}
					
					if(result.threads.length>0){
						for(var i=0;i<=result.threads.length-1;i++){
							$(page).find(".u-list").append(
								u.makeCard(
									result.threads[i]['thread_id'],
									result.threads[i]['title'],
									result.threads[i]['excerpt'],
									result.threads[i]['image_url'],
									result.threads[i]['comment_count'],
									result.threads[i]['like_count'],
									result.threads[i]['liked']
								)
							);
						}
						
						$(page).find(".app-card").clickable();
						$(page).find(".app-card").off('click');
						$(page).find(".app-card").on('click', function(){
							App.load("view", {postId:this.id, track:false});
						});
					}
					
					if(!update){
						if(mode != true){
							u.Loading(false);
						} else {
							$(page).find(".refreshBar").html(u.refreshProcess(1));
							setTimeout(function(){
								$(page).find(".refreshBar").height("0px");
								loading = false;
							}, 600);
						}
					} else {
						$(page).find(".u-loadmore").prop('disabled', false);
						$(page).find(".u-loadmore").html(u.btnProcess(false));
					}
		}, function(xhr, type){
			if(mode != true){
						u.Loading(false);
					} else {
						$(page).find(".refreshBar").html(u.refreshProcess(-1));
							setTimeout(function(){
								$(page).find(".refreshBar").height("0px");
								loading = false;
						}, 600);
					}
				    plus.nativeUI.toast("Network error(s) occupied");
				    console.log(JSON.stringify(xhr));
		});
	}
	
	$(page).find(".u-loadmore").on('click',function(){
		loadIndex(pageNow+1);
	});
	
	$(page).find(".u-logout").on('click',function(){
		backButtonLock = true;
		u.modal('<i class="fa fa-bell fa-fix"></i>提示', "真的要登出 Udia 账号吗", true, function(ret){
				backButtonLock = false;
				if (ret) {
					DataStorage.destroy("user");
					App.load('welcome');
					App.removeFromStack(0,2);
				}
		});
	});
	
	$(page).find(".u-about").on('click', function(){
		backButtonLock = true;
		u.modal('<i class="fa fa-star fa-fix"></i>uDia 1.12 Build 0707 Fix',
		"<b>· 全面修复iOS闪退问题</b><br>"
		+"<b>· 修复部分Bug</b><br>"
		+"<div style='height:5px;'></div>"
		+"Developers: <br>"
		+"于任游(Aego Yu), 张天宇(John Zhang), 费宗越, 鞠方舟, 李鸿宇(Chris Lee)<br>"
		+"<div style='height: 5px;'></div>"
		+"<i class='fa fa-android fa-fix'></i><i class='fa fa-apple fa-fix'></i><b>iDea Leaper</b><br>"
		+"<div style='height: 5px;'></div>"
		+"<i>The shortest way to do many things is to only one thing at a time.</i>",
		false, 
		function(ret){
			backButtonLock = false;
		});
	});
	
	$(page).find(".u-university").on('click', function(){
		App.load("college");
	});
	
	$(page).find(".u-name").text(DataStorage.get("user", "username"));
	loadIndex();
	getUser();
	
	$(page).on('appBack', function(){
		u.Loading(false);
	});
	
	$(page).on('appLayout', function(){
		if(refreshEvent == true){
			loadIndex();
			refreshEvent = false;
		}
	});
});