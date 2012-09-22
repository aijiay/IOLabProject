var delicious={username: 'ruidai', password: 'iolab1234'};


$(document).on("ready", function() {


$('#add-current-page-btn').on('click', function() {
	var trailname = "Test Trail";
	chrome.windows.getCurrent (function (win) {
		chrome.tabs.getAllInWindow (win.id, function (tabs) {
			for (var i=0; i<tabs.length; i++) {
				t=tabs[i];
				console.log(t.url);
				console.log(t.title);




				var newTrailName = 'trail:' + trailname.toLowerCase().replace(/ /g, '_');


				var postData = {
                    url: t.url,
                    description: t.title,
                    //extended: bookmark.data('extended'),
                    tags: newTrailName + ',' + 'step:' + i,
                    method: 'posts/add',
                    username: delicious.username,
                    password: delicious.password
                };

                saveTrail(postData);



			} //end for loop

	
	});

	}); // end get current window
}); //add current page button


});