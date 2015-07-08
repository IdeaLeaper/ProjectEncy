/*
	webapp.js
	Code: Aego
	Copyright: iDea Leaper
*/

(function ($) {
    var getScript = function (url, callback, options) {
            var settings  = $.extend({
                'url': url,
                'success' : callback || function () {},
                'dataType' : 'script',
                'async': false
            }, options || {});
            $.ajax(settings);
        };

    $.getScript = getScript;
}($ || Zepto));

function encodeHTML(text) {
	return text.toString().replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* String Templete Function */
String.prototype.templete = function(before, after){
	return this.replace("${"+before+"}",after);
}

/* trim+empty */
String.prototype.empty = function(){
	if(this.toString().trim()==""){
		return true;
	} else {
		return false;	
	}
}

String.prototype.len = function() { 
	var len = 0;
	for (var i=0; i<this.length; i++) { 
		if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) { 
			len += 2; 
		} else { 
			len ++; 
		} 
	} 
	return len; 
}

String.prototype.cut = function(len, s) { 
	var str = ''; 
	var sp = s || ''; 
	var len2 = 0; 
	for (var i=0; i<this.length; i++) {
		if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) { 
			len2 += 2; 
		} else { 
			len2 ++; 
		} 
	} 
	if (len2 <= len) { 
		return this; 
	} 
	len2 = 0; 
	len = (len > sp.length) ? len-sp.length: len; 
	for (var i=0; i<this.length; i++) {
		if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) { 
			len2 += 2; 
		} else { 
			len2 ++; 
		} 
		if (len2 > len) { 
			str += sp; 
			break; 
		} 
		str += this.charAt(i); 
	}
	return str; 
} 

var webapp = [];
/* Loadpage by Ajax (async: false) */
webapp.loadPage = function(page){
	$.ajax({
		type: 'GET',
		dataType:'text',
		url: './pages/'+page+'.html',
		async: false,
		success: function(data){
		    $('body').append(data);
		},
		  error: function(xhr, type){
		    alert('Load page '+page+' Failed');
		}
	});
}
