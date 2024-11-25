const favicon = document.getElementById("favicon");
const mode = window.matchMedia("(prefers-color-scheme: dark)");


//Set on Entry

if (mode.matches){
  console.log("dark");
  favicon.setAttribute("href", "static/images/logoDark.svg");
}
else {
  console.log("light");
  favicon.setAttribute("href", "static/images/logoLight.svg");
}

//Set on Change
mode.addEventListener("change", (event) => {
  if (event.matches){
    console.log("changeDark");
    favicon.setAttribute("href", "static/images/logoDark.svg");
  }
  else {
    console.log("changeLight");
    favicon.setAttribute("href", "static/images/logoLight.svg");
  }
                     
});
