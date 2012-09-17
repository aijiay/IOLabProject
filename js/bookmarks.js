var delicious={};
$(document).on("ready", function() {
	//$('#add-current-page-btn').on("click", function() {
		var username="trailmaker_test1";

		$.getJSON('https://feeds.delicious.com/v2/json/'
			+username+'?callback=?', function(json) {
			
			$(json).each(function(index) {

				var linkurl=this.u;
				var a = "<a href='#' class='link'>"+this.d+"</a> <a href='#' class='delete'>Delete</a>";
				console.log(a);
				var li = "<li></li>";

				
				$(li).data('extended', this.n)
				.data('tags', this.t)
				.appendTo('#bookmarks ul');

				$('#bookmarks ul li:last').prepend(a);

				$('#bookmarks ul li:last .link')
				.click(function() {
					chrome.tabs.create({url: linkurl});
				});

				$('#bookmarks ul li:last .delete')
				.click(function() {
					//QQ: this is where the delete function is, on click.
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