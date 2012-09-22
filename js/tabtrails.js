var delicious={};
var tabsData = [];
var tabsDataIndex = 0;
var trailname;

$(document).on("ready", function() {


$('#initial-btn').on('click', function() {
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


$('#enter-trail-name').on('submit', function () {

	$("#enter-trail-name").hide();
	$("#loading").show();


	trailname = $('#new-trailname').val();
	console.log(tabsData);
	console.log(trailname);
	console.log(tabsData.length);
	// call saveTrail function
	saveTrail();

	return false;

}); //enter-trail-name submit


}); // end of document-on-ready




function saveTrail() {
	alert(trailname);
	alert("entered save Trail");
	var newTrailName = 'trail:' + trailname.toLowerCase().replace(/ /g, '_');
	alert(newTrailName);
	alert("Before post data");
	var postData = {
                url: tabsData[0].url,
                description: tabsData[0].title,
                //extended: bookmark.data('extended'),
                tags: newTrailName + ',' + 'step:' + 99,
                method: 'posts/add',
                username: delicious.username,
                password: delicious.password

            };	
		alert("postData: " +  tabsData[0].title);

        $.getJSON("https://people.ischool.berkeley.edu/~qqz/delicious_proxy.php?callback=?",
                postData,
                 function(rsp){

			 alert("function rsp called");
                    if (rsp.result_code === "access denied") {
                        alert('The provided Delicious username and password are incorrect.');
                    } else if (rsp.result_code === "something went wrong") {
                        alert('There was an unspecified error communicating with Delicious.');
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
			//
					// tabsDataIndex = tabsDataIndex + 1; 
					alert("Done");
					tabsData.splice(0,1);
					if (tabsData.length > 0) {
						
					alert("SAVE this TRAIL");

		                        $("#saving").append ("# " + tabsDataIndex + " is saved.");
		                        console.log ("# "+ tabsDataIndex +" is saved.");
					tabsDataIndex++;
		                        setTimeout(saveTrail, 1000);
		                        
		            } else {
		            	alert ("It's allsaved");
		            }
		}
                });
		
	//} //end for loop

	alert("DONE SAVE TRAIL");

}// end of function

