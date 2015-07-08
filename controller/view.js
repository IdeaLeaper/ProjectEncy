App.controller('view',function(page, arguments){
	
	u.makeBack(page);
	
	var id = arguments.postId;
	var track = arguments.track;
	var imageUrl, title, content, tags, userId, liked;
	
	function loadView(){
		u.Loading(true);
		
		lapp.api("thread.get",{
			"thread_id": id,
			"user_id": DataStorage.get("user","user_id")
		}, function(result){
			$(page).find('.u-tags').empty();
			$(page).find('.u-tags').hide();
			
			if(result.tags.length>0){
						for(var i=0;i<=result.tags.length-1;i++){
							$(page).find('.u-tags').append("<span>"+result.tags[i]+"</span>");
						}
						$(page).find('span').off('click');
						$(page).find('span').on('click', function(){
								App.load('search', {tag: true, searchText: $(this).text()});
						});
						$(page).find('.u-tags').show();
			}
			
			u.templete(page, {
				"title": result.title.cut(20, '...'),
				"title-full": result.title,
				"author": result.author,
				"edit-count": result.edit_count,
				"comment-count": result.comment_count,
				"like-count": result.like_count
			});
			
			u.templete(page, {"content": encodeHTML(result.content).replace(/\n/g,"<br>")}, true);
					
					$(page).find(".app-view").show();
					
					var fixedImg = result['image_url'] + "?imageView2/1/w/400/h/300/interlace/1";
					
					/* CDN Image Adapter */
					if(DataStorage.exist("cdn") && DataStorage.get("cdn", "enabled") == true){
						fixedImg = DataStorage.get("cdn", "url") + encodeURIComponent(fixedImg);
					}
					
					$(page).find(".u-img").removeAttr("src");
					$(page).find(".u-img").attr("src", fixedImg);
					
					if($(page).find(".u-img").complete){
						$(page).find(".u-img").show();
					}
					
					$(page).find(".u-img").on('load',function(){
						$(page).find(".u-img").show();
					})
					
					imageUrl = result['image_url'];
					
					/* CDN Image Adapter */
					if(DataStorage.exist("cdn") && DataStorage.get("cdn", "enabled") == true){
						imageUrl = DataStorage.get("cdn", "url") + encodeURIComponent(imageUrl);
					}
					
					title = result.title;
					content = result.content;
					userId = result['user_id'];
					
					tags="";
					for(var i=0;i<=result.tags.length-1;i++){
						tags+=result.tags[i];
						if(i!=result.tags.length-1){
							tags+=",";
						}
					}
					
					liked = result.liked;
					if (result.liked == true){
						$(page).find(".u-like-icon").removeClass("fa-thumbs-o-up");
						$(page).find(".u-like-icon").addClass("fa-thumbs-up");
					} else {
						$(page).find(".u-like-icon").removeClass("fa-thumbs-up");
						$(page).find(".u-like-icon").addClass("fa-thumbs-o-up");
					}
					
					u.Loading(false);
					
		}, function(xhr, type){
			u.Loading(false);
			plus.nativeUI.toast("Network error(s) occupied");
			console.log(JSON.stringify(xhr));
		});
	}
	
	$(page).find(".u-comment").on('click', function(){
		App.load('comment',{postId: id, title: $(page).find(".app-title").text()});
	});
	
	$(page).find(".u-img").on('click', function(){
		App.load("photoViewer", {
			url: imageUrl
		});
	});
	
	$(page).find(".u-like").on('click', function(){
		lapp.api("like.click", {
						thread_id: id,
						cookie: DataStorage.get("user", "cookie")
					}, function(result){
						if(result.status == "succeed"){
							$(page).find(".u-like-count").text(result.like_count);
							if(liked == false){
								$(page).find(".u-like-icon").removeClass("fa-thumbs-o-up");
								$(page).find(".u-like-icon").addClass("fa-thumbs-up");
								liked = true;
							} else {
								$(page).find(".u-like-icon").removeClass("fa-thumbs-up");
								$(page).find(".u-like-icon").addClass("fa-thumbs-o-up");
								liked = false;
							}
						} else {
							plus.nativeUI.toast(result.error);
						}
					}, function(xhr, type){
						plus.nativeUI.toast("Network error(s) occupied");
						console.log(JSON.stringify(xhr));
					});
	});
	
	$(page).find(".u-edit").on('click', function(){
		if(DataStorage.get("user", "user_id") == userId){
			App.load("edit", {
					content: content,
					title: title, 
					tags: tags,
					postId: id
			});
		} else {
			u.Loading(true, true);
			lapp.api("user.get", {
				cookie: DataStorage.get("user", "cookie")
			}, function(result){
				u.Loading(false);
				if(parseInt(result.authorization) > 0){
					App.load("edit", {
						content: content,
						title: title, 
						tags: tags,
						postId: id
					});
				} else {
					plus.nativeUI.toast("permission denied");
				}
				
			}, function(xhr, type){
				u.Loading(false);
				plus.nativeUI.toast("Network error(s) occupied");
				console.log(JSON.stringify(xhr));
			});
		}
	});
	
	loadView();
	
	$(page).on('appLayout', function(){
		if(refreshEvent == true){
			loadView();
			refreshEvent = false;
		}
	});
	
	$(page).on('appBack', function(){
		u.Loading(false);
	});
});