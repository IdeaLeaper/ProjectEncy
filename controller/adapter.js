App.controller('adapter', function(page, data) {
	
	u.makeBack(page);
	
	$(page).find(".u-cdn-toggle").on('click', function(){
		var httpCDN;
		if($(page).find(".u-cdn-url").val().trim()==""){
			httpCDN = "http://www.quickrun.xyz/cdn.php?type=image&url=";
		} else {
			httpCDN = $(page).find(".u-cdn-url").val().trim();
		}
		
		if(DataStorage.exist("cdn")){
			if(DataStorage.get("cdn", "enabled") == true){
				DataStorage.destroy("cdn");
				DataStorage.set("cdn", {enabled: false, url: httpCDN});
				u.modal("uDia Advanced Setting","CDN Adapter has been disabled",false,function(){});
				$(page).find(".u-cdn-status").text("Disabled");
			} else {
				DataStorage.destroy("cdn");
				DataStorage.set("cdn", {enabled: true, url: httpCDN});
				u.modal("uDia Advanced Setting","CDN Adapter has been enabled",false,function(){});
				$(page).find(".u-cdn-status").text("Enabled");
			}
		} else {
			DataStorage.destroy("cdn");
			DataStorage.set("cdn", {enabled: true, url: httpCDN});
			u.modal("uDia Advanced Setting","CDN Adapter has been enabled",false,function(){});
			$(page).find(".u-cdn-status").text("Enabled");
		}
	});
	
	if(DataStorage.exist("cdn") && DataStorage.get("cdn", "enabled") == true){
		$(page).find(".u-cdn-status").text("Enabled");
	} else {
		$(page).find(".u-cdn-status").text("Disabled");
	}
	
	if(DataStorage.exist("cdn")){
		$(page).find(".u-cdn-url").val(DataStorage.get("cdn", "url"));
	}
	
	$(page).on('appBack', function(){
		u.Loading(false);
	});
});