App.controller('search',function(page, arguments){
	
	$(page).find(".u-search").width($(window).width()-68);
	u.makeBack(page);
	
	var pageNow;
	var tab_left_selected = true;
	
	$(page).find(".u-search").val(arguments.searchText);
	
	function resultBy(apiName, str, update){
		if(!update){
			$(page).find(".u-list").empty();
			$(page).find(".u-create").hide();
			var pageNum = 1;
			u.Loading(true);
		} else {
			var pageNum = update;
			$(page).find(".u-loadmore").prop('disabled', true);
			$(page).find(".u-loadmore").html(u.btnProcess(true));
		}
		
		lapp.api(apiName,{
			page: pageNum,
			tag: str,
			search: str,
			user_id: DataStorage.get("user", "user_id")
		}, function(result){
			pageNow = result.pagenow;
					if(pageNow != result.pages) {
						$(page).find(".u-loadmore").show();
					} else {
						$(page).find(".u-loadmore").hide();
					}
					
					if(result.threads && result.threads.length>0){
						for(var i=0;i<=result.threads.length-1;i++){
							if(i!=0 && result.threads[i].thread_id == result.threads[i-1].thread_id){
								continue;
							}
							$(page).find(".u-list").append(
								u.makeCard(
									result.threads[i].thread_id,
									result.threads[i].title,
									result.threads[i].excerpt,
									result.threads[i].image_url,
									result.threads[i]['comment_count'],
									result.threads[i].like_count,
									result.threads[i]['liked']
								)
							);
						}
						
						$(page).find(".app-card").clickable();
						$(page).find(".app-card").off('click');
						$(page).find(".app-card").on('click',function(){
							App.load("view",{postId:this.id, track:false});
						});
					} else {
						$(page).find(".u-list").html(u.noResult());
						$(page).find(".u-create").show();
					}
					
					if(!update){
						u.Loading(false);
					} else {
						$(page).find(".u-loadmore").prop('disabled', false);
						$(page).find(".u-loadmore").html(u.btnProcess(false));
					}
		}, function(xhr, type){
			u.Loading(false);
			plus.nativeUI.toast("Network error(s) occupied");
			console.log(JSON.stringify(xhr));
		});
	}
	
	
	/* Build tabs */
	u.makeTab(page,
	function(){
		u.Loading(false);
		tab_left_selected = true;
		resultBy('thread.search', $(page).find(".u-search").val());
	}, function(){
		u.Loading(false);
		tab_left_selected = false;
		resultBy('thread.tag', $(page).find(".u-search").val());
	});
	
	// Keydown event
	$(page).find(".u-search").on('keydown',function() {
		if (event.keyCode == 13) {
			if ($(page).find(".u-search").val().trim() != "") {
				if(tab_left_selected == true){
					resultBy('thread.search', $(page).find(".u-search").val());
				}else{
					resultBy('thread.tag', $(page).find(".u-search").val());
				}
			}
		}
	});
	
	// If search at home
	if(arguments.tag){
		var tab_left_selected = false;
		u.changeTab(page, "right");
		resultBy('thread.tag', $(page).find(".u-search").val());
	} else {
		resultBy('thread.search', $(page).find(".u-search").val());
	}
	
	$(page).find(".u-loadmore").on('click',function(){
		if(tab_left_selected == true){
			resultBy('thread.search', $(page).find(".u-search").val(), pageNow+1);
		}else{
			resultBy('thread.tag', $(page).find(".u-search").val(), pageNow+1);
		}
	});
	
	$(page).find(".u-create").clickable();
	$(page).find(".u-create").on('click', function(){
		if(tab_left_selected == true){
			App.load('post',{title: $(page).find(".u-search").val().trim()});
		} else {
			App.load('post',{tag: $(page).find(".u-search").val().trim()});
		}
	});
	
	// make back
	$(page).on('appBack', function(){
		u.Loading(false);
	});
	
	// auto refresh
	$(page).on('appLayout', function(){
		if(refreshEvent == true){
			if(tab_left_selected == true){
				resultBy('thread.search', $(page).find(".u-search").val());
			}else{
				resultBy('thread.tag', $(page).find(".u-search").val());
			}
			refreshEvent = false;
		}
	});
});
