App.controller('photoViewer', function(page, data) {
	
	u.makeBack(page);
	
	$(page).on("appShow",function(){
		u.Loading(true, false, "rgba(255,255,255,0.8)");
	setTimeout(function() {
		$(page).find(".u-img").attr("src", data.url);
	}, 200);
	$(page).find(".u-img").on("load", function() {
		$(page).find(".u-img").show();
		u.Loading(false);
	});
	});
	
	$(page).on('appBack', function(){
		u.Loading(false);
	});
});