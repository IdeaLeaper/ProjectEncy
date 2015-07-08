App.controller('comment',function(page, arguments){
	
	u.makeBack(page);
	
	var pageNow;
	var id = arguments.postId;
	var title = arguments.title;
	$(page).find(".u-title").text(title.cut(20, '...'));
	
	
	function loadComments(update){
		if(!update){
			var pageNum = 1;
			u.Loading(true);
		} else {
			var pageNum = update;
			$(page).find(".u-loadmore").prop('disabled', true);
			$(page).find(".u-loadmore").html(u.btnProcess(true));
		}
		
		lapp.api("comment.get", {
			"thread_id": id,
			"page": pageNum
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
						for(var i=0;i<=result.comments.length-1;i++){
							$(page).find(".u-list").append(
								u.makeComment(
									result.comments[i].author,
									result.comments[i].content.replace(/\n/g,"<br>")
								)
							);
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
		});
	}
	
	
	$(page).find(".u-comment").on('click', function(){
		var content = $(page).find(".u-content").val().trim();
		if(content.empty()){
			plus.nativeUI.toast("missing content");
			return;
		}
		
		u.Loading(true, true);

		lapp.api("comment.create", {
			content: content,
			thread_id: id,
			cookie: DataStorage.get("user", "cookie")
		}, function(result){
			u.Loading(false);
						if(result.status == "succeed"){
							$(page).find(".u-content").val("");
							loadComments();
							refreshEvent = true;
						}else{
							plus.nativeUI.toast("Comment failed");
						}
		}, function(xhr, type){
			u.Loading(false);
					    plus.nativeUI.toast("Network Error: "+type);
					    console.log(JSON.stringify(xhr));
		});
	});
	
	loadComments();
	
	$(page).find(".u-loadmore").on('click',function(){
		loadComments(pageNow+1);
	});
	
	$(page).on('appBack', function(){
		u.Loading(false);
	});
});