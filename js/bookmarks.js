var delicious={};
$(document).on("ready", function() {
	//$('#add-current-page-btn').on("click", function() {
		var username="trailmaker_test1";

		$.getJSON('https://feeds.delicious.com/v2/json/'
			+username+'?callback=?', function(json) {
			
			$(json).each(function(index) {

				var linkurl=this.u;
				var html = '<li><a href="' + this.u+'">' +this.d+'</a></li>';


				$(html).data('extended', this.n)
				.data('tags', this.t)
				.click(function() {
					chrome.tabs.create({url: linkurl});
				})
				.appendTo('#bookmarks ul');
			});

		}); //END listing all the existing bookmarks


		$('#add-current-page-btn').on('click', function() {
			chrome.tabs.getSelected(null, function (tab) {
				currURL=tab.url;
				console.log(currURL);
			});




		});

	
}); //document ready