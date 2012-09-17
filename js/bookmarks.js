var delicious={};
$(document).on("ready", function() {
	//$('#add-current-page-btn').on("click", function() {
		var username="trailmaker_test1";

		$.getJSON('https://feeds.delicious.com/v2/json/'
			+username+'?callback=?', function(json) {
			
			$(json).each(function(index) {

				var linkurl=this.u;
				var a = "<a href='#'>"+this.d+"</a>";
				console.log(a);
				var li = "<li>      blah</li>";

				
				$(li).data('extended', this.n)
				.data('tags', this.t)
				.appendTo('#bookmarks ul');

				$('#bookmarks ul li:last').prepend(a);

				$('#bookmarks ul li:last a')
				.click(function() {
					chrome.tabs.create({url: linkurl});
				});

			}); //END each

		}); //END listing all the existing bookmarks



		//add current page
		$('#add-current-page-btn').on('click', function() {
			
			chrome.tabs.getSelected(null, function (tab) {
				delicious.newURL=tab.url;
				console.log(delicious.newURL);
				//alert(delicious.newURL);

			});

			
		}); //add current page button




	
}); //document ready