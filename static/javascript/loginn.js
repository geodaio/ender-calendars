window.onload = function() {
	deleteCookie("__vercel_toolbar");
  if (checkCookies() === "user_id") {
      document.getElementById("regButton").style.display = "none";
      document.getElementById("logButton").style.display = "none";
      document.getElementById("headerUsername").style.display = "block";
      document.getElementById("headProfPic").style.display = "block";
  }
  else {
    document.getElementById("regButton").style.display = "block";
    document.getElementById("logButton").style.display = "block";
    document.getElementById("headerUsername").style.display = "none";
    document.getElementById("headProfPic").style.display = "none";
  }

	if (window.location.href == "https://endercalendars.vercel.app/login.html"){
		pageSet(checkCookies());
	}
}
 
function redirectFun() {
	var value = checkCookies();
	if (value != "user_id"){
		window.location.replace("/login.html");
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
		if (!isNaN(parseFloat(cleanerCookie[c]))){
			console.log(parseFloat(cleanerCookie[c]));
      console.log("user_id");
      found = true;
      value = "user_id";
    }
 		else if (cleanerCookie[c] === "register") {
 			console.log("register");
			found = true;
     	value = "register";
 		}
    else if (cleanerCookie[c] === "login") {
      console.log("login");
      found = true;
      value = "login";
    }
    
	 }
	if (found == false){
		storeCookies("page", "register", null);
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
	  storeCookies("page", "register", null);
  }
  else if (value === "register"){
		console.log("hit2")
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
	  storeCookies("page", "login", null);
  }
}

function storeCookies(name, value, expiration){
	var exp = expiration;
	if (exp == null){
 	var myDate = new Date();
	exp = myDate.setMonth(myDate.getMonth() + 1);
	}
	document.cookie=name+"="+value+"; expires="+exp+"; path=/";
}

function deleteCookie(name) {
  storeCookies(name,"","Thu, 01 Jan 1970 00:00:00 GMT");
}

function register() {
	event.preventDefault();
	storeCookies("page", "register", null);
	console.log("hit5");
	if (window.location.href != "https://endercalendars.vercel.app/login.html")
		window.location.href = "https://endercalendars.vercel.app/login.html";
}
function login() {
	event.preventDefault();
	storeCookies("page", "login", null);
	console.log("hit4");
	if (window.location.href != "https://endercalendars.vercel.app/login.html")
		window.location.href = "https://endercalendars.vercel.app/login.html";
}

function logOut() {
	event.preventDefault()
	deleteCookie("page");
	deleteCookie("user_id");
	console.log("hit5");
	window.location.replace("/home.html");
}
