App.controller('college', function(page, data) {
	
	u.makeBack(page);
	
	$(page).on('appBack', function(){
		u.Loading(false);
	});
});