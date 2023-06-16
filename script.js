document.getElementById("toggle-menu").addEventListener("click", function () {
  var elements = document.getElementsByClassName("nav-titles");

  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("nav-titles-unvisible");
    elements[i].classList.add("nav-titles");
  }
});

document.getElementById("close-button").addEventListener("click", function () {
  var elements = document.getElementsByClassName("nav-titles");

  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add("nav-titles-unvisible");
  }
});

document.getElementById("close-button").addEventListener("click", function () {
  var elements = document.getElementsByClassName("nav-titles");

  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add("nav-titles-unvisible");
  }
});

function alertInfo() {
  alert("Coming later...");
}
