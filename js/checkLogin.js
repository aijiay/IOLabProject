
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
				
	}
