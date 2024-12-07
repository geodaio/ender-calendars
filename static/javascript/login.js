window.onload = function() {
  if (checkCookies() == "user_id") {
    
    }
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
     	value = "register";
 		}
    else if (cleanerCookie[c] === "login") {
      console.log("login");
      found = true;
      value = "login";
    }
    else if (cleanerCookie[c] === "user_id"){
      console.log("user_id");
      found = true;
      value = "user_id";
    }
	 }
	if (found == false){
		storeCookies("page", "register");
		console.log("register");
		value="register"
	}
	console.log(document.cookie);
  return value;
};

function pageSet(value){
	if (value == null){
		value = checkCookies();
	}
	
  if (value === "login"){
		console.log("hit1")
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
  }
  else if (value === "register"){
		console.log("hit2")
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
  }
}

function pageChange(value){
	if (value == null){
		value = checkCookies();
	}

  if (value === "login"){
		console.log("hit1")
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
  }
  else if (value === "register"){
		console.log("hit2")
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
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
	console.log("hit5");
	if (window.location.href != "https://endercalendars.vercel.app/login.html")
		window.location.href = "https://endercalendars.vercel.app/login.html";
}
function login() {
	event.preventDefault();
	storeCookies("page", "login");
	console.log("hit4");
	if (window.location.href != "https://endercalendars.vercel.app/login.html")
		window.location.href = "https://endercalendars.vercel.app/login.html";
}
