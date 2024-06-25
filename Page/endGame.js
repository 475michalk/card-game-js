
const level1 = document.getElementById('l1');

level1.addEventListener('click', function () {
    localStorage.setItem("level", "1");
    window.location.href = 'play.html';
});

const level2 = document.getElementById('l2');

level2.addEventListener('click', function () {
    localStorage.setItem("level", "2");
    window.location.href = 'play.html';
});

const home = document.getElementById('BackToHome');

home.addEventListener('click', function () {
    window.location.href = 'start.html';

});

// קבלת הפרמטר מה-URL
var urlParams = new URLSearchParams(window.location.search);
var score = urlParams.get('score');

// הצגת המספר של הנקודות
var scoreElement = document.getElementById('score');
if (scoreElement) {
    scoreElement.innerText = score || "0"; // אם המספר לא קיים, הצג את 0
}

