//alert('yapnews');

$.ajax({
	url: 'req_articles.php',
	type: 'GET',
	success : function(data) {
		console.log(data);
		var obj = jQuery.parseJSON(data);
		console.log(obj);
		
	}
});
