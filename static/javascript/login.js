window.onload = function(){
  checkCookies();
}

function checkCookies() {
	var found = false;
  var value = null;
 	console.log("test");
 	var allCookies = document.cookie;
 	
 	var splitCookies = allCookies.split(";");
 	
 	for (var c = 0; c<=splitCookies.length; c++){
 		var cleanCookie;
 	    if (c != splitCookies.length){
 	      cleanCookie = splitCookies[c].trim();
 			}
 		var cleanerCookie = cleanCookie.split("=");
 		console.log(cleanerCookie);
 		if (cleanerCookie[c] === "register") {
 			console.log("register");
			found = true;
      valu = "register";
 		}
    else if (cleanerCookie[c] === "login") {
      console.log("login");
      found = true;
      value = "login";
    }
	 }
	if (found == false){
		storeCookies("page", "register");
		console.log("register");
    value = register;
	}
	console.log(document.cookie);
  return value;
};

function pageChange(){
  var value = checkCookies();

  if (value === "login"){
    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("register").style.visibility = "visible";
    register();
  }
  else if (value === "register"){
    document.getElementById("login").style.visibility = "visible";
    document.getElementById("register").style.visibility = "hidden";
    login();
  }
}

function storeCookies(name, value){
  var myDate = new Date();
	myDate.setMonth(myDate.getMonth() + 1);
	document.cookie=name+"="+value+"; expires="+myDate.toUTCString()+"; path=/";
}

function register() {
	event.preventDefault();
	storeCookies("page", "register");
}
function login() {
	event.preventDefault();
	storeCookies("page", "login");
}
