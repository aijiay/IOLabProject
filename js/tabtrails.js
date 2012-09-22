var delicious={};
var tabsData = [];

$(document).on("ready", function() {


$('#initial-btn').on('click', function() {
	alert("CLICKED");
	var trailname = "Test Trail";
	chrome.windows.getCurrent (function (win) {
		chrome.tabs.getAllInWindow (win.id, function (tabs) {
			for (var i=0; i<tabs.length; i++) {
				t=tabs[i];
				console.log(t.url);
				console.log(t.title);
				
				var tab = {};
				tab.url = t.url;
				tab.title = t.title;

				tabsData.push(tab);

			} //end for loop

		});
	});

	console.log(tabsData);
	console.log("Weeeee");
	$('#start-page').hide();
	$('#login-page').show();

}); // end of initial-btn click function

$('#submit-login').on('click', function(){
	delicious.username = $('#username').val();
	delicious.password = $('#password').val();
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
								checkLoginComplete();
                       					 }
                    				});
				
} // end of checkLogin

function checkLoginComplete(){
	$('#login-page').hide();
	$('#enter-trail-name').show();
}

		/* var newTrailName = 'trail:' + trailname.toLowerCase().replace(/ /g, '_');

		var postData = {
                    url: t.url,
                    description: t.title,
                    //extended: bookmark.data('extended'),
                    tags: newTrailName + ',' + 'step:' + i,
                    method: 'posts/add',
                    username: delicious.username,
                    password: delicious.password
                };
		*/
                // saveTrail(postData);




	


}); // end of document-on-ready
