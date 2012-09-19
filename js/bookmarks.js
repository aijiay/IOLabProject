
var delicious={username: 'ruidai', password: 'iolab1234'};
$(document).on("ready", function() {
	//$('#add-current-page-btn').on("click", function() {
		var username="trailmaker_test1";

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

			/*
//var users = xml.getElementsByTagName("user");
	
			var $xm=$(x);
			console.log($xm);
			var $p=$xm.find("posts");

			console.log($p);
			*/
			for (var i =0; i< posts.length; i++) {
				
				u = posts[i].getAttribute('href');
				d = posts[i].getAttribute('description');
				t = posts[i].getAttribute('tag');
				n = posts[i].getAttribute('extended hash');
				
				var linkurl=u;
				var a = "<a href='"+u+"' class='link' id = 'bookmark"+i+"'>"+d+"</a> <span class='label delete' >Delete</span>";
				//console.log(a);
				var li = "<li class='bookmark' ></li>";
				console.log('oustide i = '+i);

				$(li).data('extended', n)
				.data('tags', t)
				.appendTo('#bookmarks ul');

				$('#bookmarks ul li:last').prepend(a);
				
				$('#bookmark'+i).click(function() {
					console.log('click i = '+i);
					chrome.tabs.create({url: u, active:false});
				});

				$('#bookmarks ul li:last').hover(function(){
					$(this).children().show();
				});

				$('#bookmarks ul li:last').mouseleave(function(){
					$(this).children(".delete").hide();
				});

				$('#bookmarks ul li:last .delete')
				.click(function() {
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




	
}); //document ready
