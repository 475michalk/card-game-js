
const openWindowButton = document.getElementById('openWindowButton');

openWindowButton.addEventListener('click', function() {
  window.location.href = 'instructions.html';

});
document.getElementById("start-button").addEventListener("click", function() {
  var audio = document.getElementById("start_audio");
  audio.play();
  document.getElementById("id01").style.display = 'block';
});



document.getElementById("cancel-button").addEventListener("click", function() {
  document.getElementById("id01").style.display = 'none';
});

document.getElementById("1").addEventListener("click", function() {
  localStorage.setItem("level", "1");
  // את כל קוד הפעולות של הרמה 1 כאן...
});

document.getElementById("2").addEventListener("click", function() {
  localStorage.setItem("level", "2");
  // את כל קוד הפעולות של הרמה 2 כאן...
});