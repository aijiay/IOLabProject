var delicious={username: 'ruidai', password: 'iolab1234'};
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




	


});
