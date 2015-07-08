App.controller('index',function(page){

	var pageNow;
	var loading = false;
	
	var moveY = 0;
	
	$(page).find(".app-content").on("touchmove",function(e){
		if(e.touches[0].pageY - moveY > 0 && this.scrollTop==0 && loading == false){
			e.preventDefault();
			$(page).find(".refreshBar").removeClass("ani");
			if ($(page).find(".refreshBar").height() >= 34 && $(page).find(".refreshBar").height() <= 48){
				$(page).find(".refreshBar").height(e.touches[0].pageY - moveY);
				$(page).find(".refreshBar").html('<div style="position: absolute; width: 100%; bottom: 3px;">松手刷新</div>');
			} else if($(page).find(".refreshBar").height() >= 48){
			} else {
				$(page).find(".refreshBar").html('<div style="position: absolute; width: 100%; bottom: 3px;">下拉以刷新</div>');
				$(page).find(".refreshBar").height(e.touches[0].pageY - moveY);
			}
		}
	});
	
	$(page).find(".app-content").on("touchstart",function(e){
		moveY = e.touches[0].pageY;
	});
	
	$(page).find(".app-content").on("touchend",function(e){
		$(page).find(".refreshBar").addClass("ani");
		if ($(page).find(".refreshBar").height() >= 34){
			$(page).find(".refreshBar").height("34px");
			$(page).find(".refreshBar").html(u.refreshProcess(0));
			loadIndex(null, true);
		} else {
			$(page).find(".refreshBar").height("0px");
		}
	});

	
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
		
		lapp.api("tag.recently",{
			page: pageNum,
			user_id: DataStorage.get("user","user_id")
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
					
					if(result.tags.length>0){
						for(var i=0;i<=result.tags.length-1;i++){
							
							$(page).find(".u-list").append(
								u.makeTag(
									result.tags[i]['tag_id'],
									result.tags[i]['name'],
									result.tags[i]['content'],
									result.tags[i]['image_url'],
									result.tags[i]['follow'],
									result.tags[i]['count']
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
	
	$(page).find(".u-cloud").on('click',function(){
		App.load("myCenter");
	});
	
	$(page).find(".u-post").on('click', function(){
		App.load("post");
	});
	
	$(page).find(".u-loadmore").on('click',function(){
		loadIndex(pageNow+1);
	});
	
	$(page).find(".u-top-threads").on('click', function(){
		App.load('world', 'implode-out');
	});
	
	$(page).find(".app-input").on('keydown',function() {
		if (event.keyCode == 13) {
			if ($(page).find(".u-search").val().trim() != "") {
				App.load("search", {
					searchText: $(page).find(".u-search").val().trim()
				});
				$(page).find(".u-search").val("");
			}
		}
	});
	
	loadIndex();
	
	$(page).on('appLayout', function(){
		if(refreshEvent == true){
			loadIndex();
			refreshEvent = false;
		}
	});
});
