
var myVar;
let spin = document.querySelector(".spinner")
let navo =document.querySelector("nav")
let main = document.querySelector('main')
function myFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  spin.style.display = "none";
  navo.style.display = "block";
  main.style.display = 'flex'
}
myFunction()