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


function saveTrail (data, trailname) {
	for (var i=0; i < data.length; i++) {


		t=data[i];

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


        $.getJSON("https://people.ischool.berkeley.edu/~qqz/delicious_proxy.php?callback=?",
                postData,
                 function(rsp){
                    if (rsp.result_code === "access denied") {
                        console.log('The provided Delicious username and password are incorrect.');
                    } else if (rsp.result_code === "something went wrong") {
                        console.log('There was an unspecified error communicating with Delicious.');
                    } else if (rsp.result_code === "done") {
                        // Bookmark was saved properly
                        //$('#new-trail li:first').remove(); // Remove the line for the bookmark we just saved
                        //if ($('#new-trail li').length > 0) {
                            // Save the next bookmark in the trail in 1000ms (1 second)
                            // We have to wait this period of time to comply with the
                            // terms of the Delicious API. If we don't we may have access denied.
                            //setTimeout(saveTrail, 1000);
                        //} else {
                            // We're done saving the trail
                         //   window.delicious_password = null;
                         //   alert ("Your trail has been saved!");
                        //}


                        
                    }
                });
		setTimeout(function(){}, 1000);
	} //end for loop
}
