/*
	components.js
	Code: Aego
	Copyright: iDea Leaper
*/

var u = new Object();

u.refreshProcess = function(status) {
	if(status == 0){
		return '<div style="position: absolute; width: 100%; bottom: 2px;"><i class="fa fa-spinner fa-spin fa-fix"></i>正在刷新</div>';
	} else if(status == 1){
		return '<div style="position: absolute; width: 100%; bottom: 2px;"><i class="fa fa-check fa-fix"></i>刷新成功</div>';
	} else {
		return '<div style="position: absolute; width: 100%; bottom: 2px;"><i class="fa fa-times fa-fix"></i>刷新失败</div>';
	}
}

u.btnProcess = function(status){
	if(status == false){
		return '<i class="fa fa-angle-double-down fa-lg fa-fix"></i>加载更多';
	} else {
		return '<i class="fa fa-spinner fa-spin fa-fix"></i>正在加载...';
	}
}

u.signProcess = function(status){
	if(status == false){
		return '<i class="fa fa-pencil-square-o fa-lg fa-fix"></i>签名支持此倡议';
	} else {
		return '<i class="fa fa-check fa-lg fa-fix"></i>您已签名';
	}
}

u.noResult = function(){
	return '<div class="fade-in" style="text-align: center;'
	+'margin-top: 45px; margin-bottom: 5px;'
	+'font-size: 18px;'
	+'color: rgb(80,80,80);">'
	+'哎呀, 没有找到相关内容'
	+'</div>';
}


u.modal = function(title, text, cancel, callback){
	var dialog = '<div class="app-cover"></div>'
	+'<div class="app-dialog">'
	+'<div class="title">'+title+'</div>'
	+'<div class="text">'+text+'</div>'
	+'<div class="btn u-dialog-yes">确定</div>'
	+'</div>';
	
	var dialogWithCancel = '<div class="app-cover"></div>'
	+'<div class="app-dialog">'
	+'<div class="title">'+title+'</div>'
	+'<div class="text">'+text+'</div>'
	+'<div class="btn u-dialog-yes">确定</div>'
	+'<div class="btn u-dialog-cancel">取消</div>'
	+'</div>';
	
	if(cancel == true){
		$('body').append(dialogWithCancel);
	}else{
		$('body').append(dialog);
	}
	
	$('body').find(".app-dialog .btn").clickable();
	
	$('body').find(".u-dialog-yes").off('click');
	$('body').find(".u-dialog-cancel").off('click');
	
	$('body').find(".u-dialog-yes").on('click', function(){
		$('body').find(".app-dialog").remove();
		$('body').find(".app-cover").remove();
		callback(true);
	});
	
	$('body').find(".u-dialog-cancel").on('click', function(){
		$('body').find(".app-dialog").remove();
		$('body').find(".app-cover").remove();
		callback();
	});
}


u.post = function(title, info1, info2, callback){
	
	var dialog = '<div class="app-cover"></div>'
	+'<div class="app-dialog">'
	+'<div class="title">'+title+'</div>'
	+'<div style="height: 5px;"></div>'
	+'<input class="u-dialog-val-a" placeholder="'+info1+'"></input>'
	+'<div style="height: 5px;"></div>'
	+'<textarea class="u-dialog-val-b" placeholder="'+info2+'"></textarea>'
	+'<div style="height: 10px;"></div>'
	+'<div class="btn u-dialog-yes">确定</div>'
	+'<div class="btn u-dialog-cancel">取消</div>'
	+'</div>';
	
	$('body').append(dialog);
	
	$('body').find(".app-dialog .btn").clickable();
	
	$('body').find(".u-dialog-yes").off('click');
	$('body').find(".u-dialog-cancel").off('click');
	
	$('body').find(".u-dialog-yes").on('click', function(){
		
		var a = $('body').find(".u-dialog-val-a").val().trim();
		var b = $('body').find(".u-dialog-val-b").val().trim();
		
		if(a.empty()||b.empty()){
			plus.nativeUI.toast("缺少必填项");
			return;
		}
		
		$('body').find(".app-dialog").remove();
		$('body').find(".app-cover").remove();
		
		callback(true, a, b);
	});
	
	$('body').find(".u-dialog-cancel").on('click', function(){
		$('body').find(".app-dialog").remove();
		$('body').find(".app-cover").remove();
		callback();
	});
}


/* loading model */
u.Loading = function(status, cover, color){
	var loading = '<div class="app-load"><div class="icon spin-color"></div></div>';
	var coverTmp = '<div class="app-cover"></div>';
	if(status == true){
		$('body').append(loading);
	}else{
		$('body').find(".app-load").remove();
		$('body').find(".app-cover").remove();
		backButtonLock = false;
	}
	
	if(status == true && cover == true){
		backButtonLock = true;
		$('body').append(coverTmp);
		$('body').find(".app-load .icon").addClass("covered");
	}
	
	if(color){
		$('body').find(".app-load .icon").css("border-color", color);
		$('body').find(".app-load .icon").css("border-bottom-color", "rgba(0,0,0,0)");
	}
}

/* Build tabs */
u.changeTab = function(page, choice){
	if (choice == "left"){
		$(page).find(".tab.right").removeClass("yes");
			$(page).find(".tab.right").addClass("no");
			$(page).find(".tab.left").removeClass("no");
			$(page).find(".tab.left").addClass("yes");
			$(page).find(".tab.left").prop('disabled', true);
			$(page).find(".tab.right").prop('disabled', false);
	} else if (choice == "right"){
		$(page).find(".tab.left").removeClass("yes");
			$(page).find(".tab.left").addClass("no");
			$(page).find(".tab.right").removeClass("no");
			$(page).find(".tab.right").addClass("yes");
			$(page).find(".tab.left").prop('disabled', false);
			$(page).find(".tab.right").prop('disabled', true);
	}
}

u.makeTab = function(page, action_left, action_right){
	$(page).find(".tab.left").prop('disabled', true);
	$(page).find(".tab.right").prop('disabled', false);
	
	/* Switch tabs */
	$(page).find(".tab.left").on('click',function(){
		if(!action_left){
			$(page).find(".u-tab-left").show();
			$(page).find(".u-tab-right").hide();
		} else {
			action_left();
		}
			$(page).find(".tab.right").removeClass("yes");
			$(page).find(".tab.right").addClass("no");
			$(page).find(".tab.left").removeClass("no");
			$(page).find(".tab.left").addClass("yes");
			$(page).find(".tab.left").prop('disabled', true);
			$(page).find(".tab.right").prop('disabled', false);
	});
	
	$(page).find(".tab.right").on('click',function(){
		if(!action_right){
			$(page).find(".u-tab-right").show();
			$(page).find(".u-tab-left").hide();
		} else {
			action_right();
		}
			$(page).find(".tab.left").removeClass("yes");
			$(page).find(".tab.left").addClass("no");
			$(page).find(".tab.right").removeClass("no");
			$(page).find(".tab.right").addClass("yes");
			$(page).find(".tab.left").prop('disabled', false);
			$(page).find(".tab.right").prop('disabled', true);
	});
}

/* Build Index Cards */
u.makeCard = function(id, title, excerpt, src, comment_count, thumbs, ifthumbed){
	
	var card = '<div id="${id}" class="app-card fade-in">'
	+'<div class="left" style="text-align:center;"><img src="${src}"></img></div>'
	+'<div class="right">'
	+'<div class="thumbs"><i class="fa ${thumb_icon} fa-fix-sm"></i>${thumbs}</div><div class="comment"><i class="fa fa-comment-o fa-fix-sm"></i>${comment_count}</div><div class="title">${title}</div>'
	+'<div class="excerpt">${excerpt}</div>'
	+'</div>'
	+'</div>';
	
	var fixedImg = src + "?imageView2/1/w/184/h/184/interlace/1";
	
	/* CDN Image Adapter */
	if(DataStorage.exist("cdn") && DataStorage.get("cdn", "enabled") == true){
		fixedImg = DataStorage.get("cdn", "url") + encodeURIComponent(fixedImg);
	}
	
	card = card.templete("id", encodeHTML(id));
	card = card.templete("src", encodeHTML(fixedImg));
	card = card.templete("title", encodeHTML(title));
	card = card.templete("excerpt", encodeHTML(excerpt));
	card = card.templete("thumbs", encodeHTML(thumbs));
	card = card.templete("comment_count", encodeHTML(comment_count));
	
	if (ifthumbed){
		card = card.templete("thumb_icon", "fa-thumbs-up");
	} else {
		card = card.templete("thumb_icon", "fa-thumbs-o-up");
	}
	
	return card;
}

// Build Tag Card
u.makeTag = function(id, title, content, src, follow, count){
	
	if(src == "NULL"){
		var card = '<div id="${id}" class="app-card fade-in"><div class="line"></div>'
		+'<div class="noimage">'
		+'<div class="thumbs"><i class="fa fa-star fa-fix-sm"></i>${follow}</div><div class="comment"><i class="fa fa-paper-plane fa-fix-sm"></i>${count}</div><div class="title">${name}</div>'
		+'<div class="excerpt">${content}</div>'
		+'</div>'
		+'</div>';
	} else {
		var card = '<div id="${id}" class="app-card fade-in">'
		+'<div class="left" style="text-align:center;"><img src="${src}"></img></div>'
		+'<div class="right">'
		+'<div class="thumbs"><i class="fa fa-star fa-fix-sm"></i>${follow}</div><div class="comment"><i class="fa fa-paper-plane fa-fix-sm"></i>${count}</div><div class="title">${name}</div>'
		+'<div class="excerpt">${content}</div>'
		+'</div>'
		+'</div>';
	}
	
	var fixedImg = src + "?imageView2/1/w/184/h/184/interlace/1";
	
	/* CDN Image Adapter */
	if(DataStorage.exist("cdn") && DataStorage.get("cdn", "enabled") == true){
		fixedImg = DataStorage.get("cdn", "url") + encodeURIComponent(fixedImg);
	}
	
	card = card.templete("id", encodeHTML(id));
	card = card.templete("src", encodeHTML(fixedImg));
	card = card.templete("name", encodeHTML(title));
	card = card.templete("content", encodeHTML(content));
	card = card.templete("follow", encodeHTML(follow));
	card = card.templete("count", encodeHTML(count));
	
	/*if (ifthumbed){
		card = card.templete("thumb_icon", "fa-thumbs-up");
	} else {
		card = card.templete("thumb_icon", "fa-thumbs-o-up");
	}*/
	
	return card;
}

/* Build Comments */
u.makeComment = function(auth, content){
	
	var card = '<div class="app-comment fade-in">'
	+'<div class="left"><div class="ti">${firstLetter}</div></div>'
	+'<div class="right"><b class="title">${auth}</b>'
	+'<p class="content">${content}</p></div>'
	+'</div>';
	
	card = card.templete("auth", encodeHTML(auth));
	card = card.templete("content", encodeHTML(content));
	card = card.templete("firstLetter", encodeHTML(auth.substr(0, 1).toUpperCase()));
	
	return card;
}

/* Build Titles */
u.makeTitle = function(id, title){
	var card = '<div id="${id}" class="app-title-card"><div class="ti">${firstLetter}</div>${title}</div>'
	
	card = card.templete("id", id);
	card = card.templete("title", title);
	card = card.templete("firstLetter", title.substr(0, 1).toUpperCase());
	
	return card;
}

u.templete = function(page, arr, html){
	for (x in arr){
		if(html){
			$(page).find(".u-"+x).html(arr[x]);
		} else {
			$(page).find(".u-"+x).text(arr[x]);
		}
	}
}

/* return button */
u.makeBack = function(page){
	$(page).find(".u-back").on('click',function(){
		App.back();
	});
}
