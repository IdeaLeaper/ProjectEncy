App.controller('edit', function(page, arguments){
	
	u.makeBack(page);
	
	var id = arguments.postId;
	var title = arguments.title;
	var content = arguments.content.toString().replace(/<br\/>/g,"\n");
	var tags_input = arguments.tags;

	$(page).find(".u-title").val("[EDIT] "+title);
	$(page).find(".u-content").val(content);
	$(page).find(".u-tags").val(tags_input);
	
	var preImg;
	
	function compressImg(path){
		u.Loading(true, true);
		var img = new Image();
		img.src = path; // The path of the image
		img.onload = function(){
				var finalCanvas = document.getElementById("u2d");
				var ctx = finalCanvas.getContext("2d");
				//  Paint the image to the Canvas
				finalCanvas.height = img.height*0.7;
				finalCanvas.width = img.width*0.7;
				ctx.drawImage(img, 0, 0,img.width,img.height,0,0,img.width*0.7,img.height*0.7);
				// Using canvas to compress
				preImg = finalCanvas.toDataURL("image/jpeg", 0.4);
				$(page).find(".u-img").attr("src", preImg);
				$(page).find(".u-warm-up").show();
				u.Loading(false);
		}
	}
	
	$(page).find(".u-warm-up").hide();
	
	$(page).find(".u-takeimg").on('click',function(){
		var cmr = plus.camera.getCamera();
		cmr.captureImage(function(path) {
			plus.gallery.save(path,function(){
				compressImg("http://localhost:13131/"+path);
			});
		},
		function(e) {},
		{
			filename: "_doc/gallery/",
			index: 1
		});
	});
	
	$(page).find(".u-loadimg").on('click',function(){
		plus.gallery.pick(function(path) {
			compressImg(path);
		},
		function(e) {},
		{
				filter: "image"
		});
	});
	
	$(page).find(".u-post").on('click',function(){
		var content = $(page).find(".u-content").val().trim();
		
		var tagSource = $(page).find(".u-tags").val();
		tagSource = tagSource.replace(/\s*，\s*/g,",");
		var tags_array = tagSource.split(",");
		var tags = JSON.stringify(tags_array);
		
		if(content.empty()){
			plus.nativeUI.toast("missing required fields");
			return;
		}
		
		if(content.len()<100){
			plus.nativeUI.toast("主要内容太短啦");
			return;
		}
		
		u.Loading(true, true);
		if(!preImg||preImg.search("image/jpeg") == -1){
								lapp.api("thread.edit", {
									thread_id: id,
									title: title,
									content: content,
									tags: tags,
									cookie: DataStorage.get("user", "cookie")
								}, function(result){
									u.Loading(false);
										if(result.status == "succeed"){
											refreshEvent = true;
											App.back();
										} else {
											plus.nativeUI.toast(result.error);
										}
								}, function(xhr, type){
									u.Loading(false);
									plus.nativeUI.toast("Network error(s) occupied");
									console.log(JSON.stringify(xhr));
								});
		} else {
			lapp.api("cloud.upload", {
				base64: preImg
			}, function(data){
				if(data.status == "succeed"){
								var imgUrl = data.url+data.key;
								lapp.api("thread.edit", {
									thread_id: id,
									title: title,
									content: content,
									image_url: imgUrl,
									tags: tags,
									cookie: DataStorage.get("user", "cookie")
								}, function(result){
									u.Loading(false);
										if(result.status == "succeed"){
											refreshEvent = true;
											App.back();
										} else {
											plus.nativeUI.toast(result.error);
										}
								}, function(xhr, type){
									u.Loading(false);
									plus.nativeUI.toast("Network error(s) occupied");
									console.log(JSON.stringify(xhr));
								});
							}else{
								u.Loading(false);
								plus.nativeUI.toast("FileType error");
							}
			}, function(xhr, type){
				u.Loading(false);
				plus.nativeUI.toast("Network Error: "+type);
				console.log(JSON.stringify(xhr));
			});
		}
	});
	
	$(page).on('appBack', function(){
		u.Loading(false);
	});
});
