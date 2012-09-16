		var delicious = {};
		var postData = ({
			});
		$(document).ready(function() {
				$('#login-form').submit(function(){
					console.log("Login clicked");
                    			$.getJSON('https://api.del.icio.us/v1/json/tags/get',
						postData,
                     				function(){
                        				window.open("page2.html", "_self");
					
						});
					return false;
				
				});
				
		});
