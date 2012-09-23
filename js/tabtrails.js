var delicious={};
var tabsData = [];
var tabsDataIndex = 0;
var trailname;
var ori_length;

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
				tab.step = i;

				tabsData.push(tab);

			} //end for loop
			ori_length=tabsData.length;
		}); });

	
	$('#start-page').hide();
	$('#login-page').show();

}); // end of initial-btn click function

$('#submit-login').on('click', function(){
	delicious.username = $('#username').val();
	delicious.password = $('#password').val();
	checkLogin();
	return false;
});


$('#enter-trail-name').on('submit', function () {




	trailname = $('#new-trailname').val();

	if ($.trim(trailname) ==="") {
		$('#no-trailname-error').show();

	} else {
		
		$("#enter-trail-name").hide();
		$("#loading").show();
		saveTrail();
	}	
	

	return false;

}); //enter-trail-name submit


}); // end of document-on-ready


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
                       						 $("#login-error").show();
                   					 } else if (rsp.result_code === "something went wrong") {
                       						 $("#unknown-error").show();
                  					 
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


function saveTrail() {
	//alert(trailname);
	//alert("entered save Trail");
	var newTrailName = 'trail:' + trailname.toLowerCase().replace(/ /g, '_');
	//alert(newTrailName);
	//alert("Before post data");
	var postData = {
                url: tabsData[0].url,
                description: tabsData[0].title,
                //extended: bookmark.data('extended'),
                tags: newTrailName + ',' + 'step:' + tabsData[0].step,
                method: 'posts/add',
                username: delicious.username,
                password: delicious.password

            };	
		//alert("postData: " +  tabsData[0].title);
		console.log(postData);
        $.getJSON("https://people.ischool.berkeley.edu/~qqz/delicious_proxy.php?callback=?",
                postData,
                 function(rsp){

			//alert("function rsp called");
                    if (rsp.result_code === "access denied") {
                        //alert('The provided Delicious username and password are incorrect.');
                    } else if (rsp.result_code === "something went wrong") {
                        //alert('There was an unspecified error communicating with Delicious.');
                    } else if (rsp.result_code === "done") {
                      
					tabsData.splice(0,1);
					if (tabsData.length > 0) {
						
							//alert("SAVE this TRAIL");

		                        //$("#saving").append ("# " + tabsDataIndex + " is saved.");\

		                        console.log("ori: "+ori_length);
		                        console.log("tabs data length"+tabsData.length);

		                        var p= (ori_length- tabsData.length ) / ori_length*100;
		                        console.log(p);
		                        $('#progress-bar').css('width', ''+p+'%');
		                        console.log ("# "+ tabsDataIndex +" is saved.");
								tabsDataIndex++;
		                        setTimeout(saveTrail, 1000);
		                        
		            } else {

		            	$('#progress-bar').css('width', '100%');

		            	//console.log ("It's all saved");
						$('#finished').show();

						$('#go-to-delicious').click(function() {
							chrome.tabs.create({url: "http://delicious.com/"+ delicious.username, active:false});
						});

						$('#loading').hide();
		            }
		}
                });
		
	//} //end for loop
	

	console.log("DONE SAVE TRAIL");



}// end of function

