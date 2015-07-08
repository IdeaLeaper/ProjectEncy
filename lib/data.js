	var DataStorage = [];
	DataStorage.exist = function(name){
		if(localStorage[name])
			return true;
		else
			return false;
	}
	
	DataStorage.init = function(name){
		var storage = new Object();
		localStorage[name] = JSON.stringify(storage);
	}
	
	DataStorage.set = function(name, arr){
		if(localStorage[name]){
			var storage = JSON.parse(localStorage[name]);
			for(x in arr){
				storage[x] = arr[x];
			}
			localStorage[name] = JSON.stringify(storage);
			return true;
		} else {
			var storage = new Object();
			for(x in arr){
				storage[x] = arr[x];
			}
			localStorage[name] = JSON.stringify(storage);
			return true;
		}
	}
	
	DataStorage.get = function(name, attr){
		if(localStorage[name]){
			var storage = JSON.parse(localStorage[name]);
			if(storage[attr]){
				return storage[attr];
			} else {
				return false;
			}
		} else {
			return false
		}
	}
	
	DataStorage.remove = function(name, attr){
		if(localStorage[name]){
			var storage = JSON.parse(localStorage[name]);
			if(storage[attr]){
				delete storage[attr];
			}
			localStorage[name] = JSON.stringify(storage);
		} else {
			return false;
		}
	}
	
	DataStorage.destroy = function(name){
		delete localStorage[name];
	}