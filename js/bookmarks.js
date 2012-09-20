
var delicious={username: 'ruidai', password: 'iolab1234'};
$(document).on("ready", function() {


	getBookmarks();
	function getBookmarks(){
	var postData = {
		method: 'posts/all',
		username: delicious.username,
		password: delicious.password
	}

	$.getJSON('https://people.ischool.berkeley.edu/~qqz/delicious_proxy.php?callback=?',
					postData, function(json) {
		var x=$.parseXML(json.xml);


		var posts = x.getElementsByTagName("post");
		console.log(posts);

		for (var i =0; i< posts.length; i++) {
			
			u = posts[i].getAttribute('href');
			d = posts[i].getAttribute('description');
			t = posts[i].getAttribute('tag');
			n = posts[i].getAttribute('extended hash');
			
			var linkurl=u;
			var a = "<a href='"+u+"' class='link' >"+d+"</a> <span class='label delete' >Delete</span>";
			//console.log(a);
			var li = "<li id='bookmark"+i+"' ></li>";

			$(li).data('extended', n)
			.data('tags', t)
			.appendTo('#bookmarks ul');

			$('#bookmark'+i).prepend(a);
			
			$('#bookmark'+i+' .link').click(function() {
				console.log(this);
				console.log('click i = '+i);
				chrome.tabs.create({url: this.href, active:false});
			});

			$('#bookmark'+i).hover(function(){
				$(this).children().show();
			});

			$('#bookmark'+i).mouseleave(function(){
				$(this).children(".delete").hide();
			});

			$('#bookmark'+i+' .delete')
			.click(function() {
				console.log($(this).parent().attr('id'));
				console.log("clicked");
				$('#bookmarks').hide();
				$('#confirm-delete').show();
				
				$('#confirm-delete-link').html($(this).parent().clone());

				$('#confirm-delete-ok').click( function() { okDelete(); });
				$('#confirm-delete-cancel').click( function(){ cancelDelete(); });

				//QQ: this is where the delete function is, on click.
			});

		} //end for




	}); //END listing all the existing bookmarks



	//add current page
	$('#add-current-page-btn').on('click', function() {
		
		chrome.tabs.getSelected(null, function (tab) {
			delicious.newURL=tab.url;
			console.log(delicious.newURL);
			//alert(delicious.newURL);

		});

		
	}); //add current page button

	} // end getBookmarks

	function okDelete(){
		$('#confirm-delete').hide();
		// the bookmark gets deleted
		$('#bookmarks').show();
	}

	function cancelDelete(){
		$('#confirm-delete').hide();
		$('#bookmarks').show();
	}


	
}); //document ready
