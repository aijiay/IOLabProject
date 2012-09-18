		var delicious = {};


		$(document).ready(function() {
				$('#login-form').on("submit", function(){
					delicious.username = $('#username').val();
					delicious.password = $('#password').val();
					console.log("Login clicked");
					saveLogin();
					return false;
				});

				function saveLogin(){

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
							alert(rsp.result_code);
                        			//	window.open("page2.html", "_self");
                   					 if (rsp.result_code === "access denied") {
                       						 alert('The provided Delicious username and password are incorrect.');
                   					 } else if (rsp.result_code === "something went wrong") {
                       						 alert('There was an unspecified error communicating with Delicious.');
                  					  } else if (rsp.result_code === "done") {
                        					// Bookmark was saved properly
                        					alert("Success!");
                       					 } else {
                            					// We're done saving the trail
                           					 alert ("Your trail has been saved!");
                       					 }
                    				});
					
					return false;
				
				}
				
		});
