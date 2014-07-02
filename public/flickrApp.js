$(document).ready(function() {
	$("#btnSubmit").click(function(){
		alert("button");
	}); 
});

var loadFlickrImages=function(text, page) {
	$.get("localhost:3000/search/?text="+text + "&page=" + "1", function(data) {
		console.log(data)
	})



}

/*http://jquery.com/download/*/