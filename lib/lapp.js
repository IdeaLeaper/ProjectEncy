/* 
    Lapp.js For HTML5 Webapp
    You must install Lapp Framework on your server before use this javascript
*/

var lapp = [];
lapp.server = "http://udia.skypt.cn/udia/";
lapp.api = function (api_string, data_array, callback, error_function) {
	var type;
	if(JSON.stringify(data_array).length < 1024){
		type = 'GET';
	} else {
		type = 'POST';
	}
    $.ajax({
        type: type,
        dataType: 'json',
        url: lapp.server,
        timeout: 50000,
        cache: false,
        data: {
            api: api_string,
            data: JSON.stringify(data_array)
        },
        success: function(result){
        	return callback(result);
        },
        error: function(xhr, type){
        	return error_function(xhr, type);
        }
    });
}