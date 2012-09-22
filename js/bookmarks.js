
var delicious={username: 'ruidai', password: 'iolab1234'};
$(document).on("ready", function() {
	
	
	console.log("Page loading...");
	
	loginPage();
	function loginPage(){
		$('#loading').hide();
		$('#bookmarks-page').hide();
		$('#bookmark-added-page').hide();

		document.body.style.height= '200px';
		document.getElementsByTagName("html")[0].style.height= '200px';
	
	}
	// getBookmarks();
	
	$('#login-form').on("submit", function(){
		delicious.username = $('#username').val();
		delicious.password = $('#password').val();
		console.log("Login clicked");
		checkLogin();
		return false;
	});

	function checkLogin(){

		console.log(delicious.username);
		console.log(delicious.password);
		console.log("U/P printed inside saveLogin()");

		var postData = {
			method: 'posts/get',
                    	username: delicious.username,
                    	password: delicious.password
               	};

                $.getJSON('https://people.ischool.berkeley.edu/~qqz/delicious_proxy.php?callback=?',
						postData,
                     				function(rsp){
                   					 if (rsp.result_code === "access denied") {
                       						 alert('The provided Delicious username and password are incorrect.');
                   					 } else if (rsp.result_code === "something went wrong") {
                       						 alert('There was an unspecified error communicating with Delicious.');
                  					 
                       					 } else {
                            					// We're ok - continue with the login;

								getBookmarks();
                       					 }
                    				});
					
					//return false;
	}




	function getBookmarks(){
	
	var postData = {
		method: 'posts/all',
		username: delicious.username,
		password: delicious.password
	}

	$.getJSON('https://people.ischool.berkeley.edu/~qqz/delicious_proxy.php?callback=?',
		postData, function(json) {
		var x=$.parseXML(json.xml);
		
		console.log("API call for getBookmarks");
		$('#loading').hide();
		$('#login-page').hide();
		console.log("Login page hide called");
		$('#bookmarks-page').show();
		$('#bookmarks').show();
		var posts = x.getElementsByTagName("post");
		console.log(posts);

		for (var i =0; i< posts.length; i++) {
			
			u = posts[i].getAttribute('href');
			d = posts[i].getAttribute('description');
			t = posts[i].getAttribute('tag');
			n = posts[i].getAttribute('extended hash');
			
			var linkurl=u;
			var a = "<a href='"+u+"' class='link' >"+d+"</a> <span class='label delete' >Delete</span>";
			console.log(a);
			var li = "<li id='bookmark"+i+"' class='bookmark' ></li>";

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
				$('#bookmarks-page').hide();

				$('#confirm-delete').show();
				
				var cloneLink = $(this).parent().clone();
				$(cloneLink).children(".delete").hide();
				$('#confirm-delete-link').html(cloneLink);
				
				var deleteLink = $(this).parent().children(".link").attr('href')
				console.log(deleteLink);
				
				$('#confirm-delete-ok').click( function() { okDelete(deleteLink); });
				$('#confirm-delete-cancel').click( function(){ cancelDelete(); });

				//QQ: this is where the delete function is, on click.
			});

		



			// widen page width if necessary
			// if this page is wider than the longest existing link...
/*
			var linkWidth = $('#bookmark'+i+' .link').css('width');
			console.log("link width");
			console.log(linkWidth);
			if (linkWidth >= $('.container').css('width')){
				$('.container').css({ width: linkWidth });
			}*/

			// then set container to new width.

		} //end for

	}); //END listing all the existing bookmarks


	// $(window).height( $('#bookmarks-page').css('height'));
	document.body.style.height= $('#bookmarks-page').css('height');
	document.getElementsByTagName("html")[0].style.height=$('#bookmarks-page').css('height');
	
	//var newBookmarkDes;

	$("#submit-bookmark").on("click", function() {
			$('#description-text').val()
			.appendTo('#bookmarks ul'); });
		
<<<<<<< HEAD
	
=======
		/*chrome.tabs.getSelected(null, function (tab) {
			delicious.newURL=tab.url;
			console.log(delicious.newURL);
			//alert(delicious.newURL);
>>>>>>> tabtrails.js


<<<<<<< HEAD
=======
		*/
		console.log("blah");
		chrome.windows.getCurrent (function (win) {
			chrome.tabs.getAllInWindow (win.id, function (tabs) {
				console.log(tabs)



		});

		});
	}); //add current page button
>>>>>>> tabtrails.js

	} // end getBookmark

	addCurrentPageBtn();

	function addCurrentPageBtn(){
		//add current page
	
		
		$('#add-current-page-btn').on('click', function() {
			
			chrome.tabs.getSelected(null, function (tab) {
				delicious.newURL=tab.url;
				console.log(delicious.newURL);

				alert(delicious.newURL);
				
				$('#bookmark-added-page').show();
				$('#bookmarks-page').hide();
				$('#url-text').attr('value', delicious.newURL); // = delicious.newURL;
				//alert(delicious.newURL);

			});		
		}); 
		//add current page button
	}
		
	
	function okDelete(url){

		// Reset bookmarks and hide the confirmation page
		$('#bookmarks').html('<ul id="current-book-marks"></ul>');
		$('#confirm-delete-ok').unbind('click');
		$('#confirm-delete-cancel').unbind('click');
		$('#confirm-delete').hide();
		$('#loading').show();
		// del.icio.us API call
		var postData = {
			url: url,
			method: 'posts/delete',
			username: delicious.username,
			password: delicious.password
		}
		$.getJSON('https://people.ischool.berkeley.edu/~qqz/delicious_proxy.php?callback=?',
			postData, function(json) {
				console.log("Bookmark deleted");
				getBookmarks(); // get updated list of bookmarks
			});
	}

	function cancelDelete(){
		$('#bookmarks-page').show();
		$('#confirm-delete').hide();
		$('#confirm-delete-ok').unbind('click');
		$('#confirm-delete-cancel').unbind('click');

	}

	
}); //document ready
