
var imageArray = [
    { url: "../Images/Card/1.jpg", object: 4 },
    { url: "../Images/Card/2.jpg", object: 5 },
    { url: "../Images/Card/3.jpg", object: 2 },
    { url: "../Images/Card/4.jpg", object: 5 },
    { url: "../Images/Card/5.jpg", object: 3 },
    { url: "../Images/Card/6.jpg", object: 4 },
    { url: "../Images/Card/7.jpg", object: 2 },
    { url: "../Images/Card/8.jpg", object: 1 },
    { url: "../Images/Card/9.jpg", object: 4 },
    { url: "../Images/Card/10.jpg", object: 2 },
    { url: "../Images/Card/11.jpg", object: 2 },
    { url: "../Images/Card/12.jpg", object: 4 },
    { url: "../Images/Card/13.jpg", object: 3 },
    { url: "../Images/Card/14.jpg", object: 2 },
    { url: "../Images/Card/15.jpg", object: 3 },
    { url: "../Images/Card/16.jpg", object: 5 },
    { url: "../Images/Card/17.jpg", object: 3 },
    { url: "../Images/Card/18.jpg", object: 1 },
    { url: "../Images/Card/19.jpg", object: 2 },
    { url: "../Images/Card/20.jpg", object: 5 },
    { url: "../Images/Card/21.jpg", object: 1 },
    { url: "../Images/Card/22.jpg", object: 4 },
    { url: "../Images/Card/23.jpg", object: 2 },
    { url: "../Images/Card/24.jpg", object: 5 },
    { url: "../Images/Card/25.jpg", object: 5 },
    { url: "../Images/Card/26.jpg", object: 2 },
    { url: "../Images/Card/27.jpg", object: 4 },
    { url: "../Images/Card/28.jpg", object: 1 },
    { url: "../Images/Card/29.jpg", object: 4 },
    { url: "../Images/Card/30.jpg", object: 5 },
    { url: "../Images/Card/31.jpg", object: 5 },
    { url: "../Images/Card/32.jpg", object: 4 },
    { url: "../Images/Card/33.jpg", object: 3 },
    { url: "../Images/Card/34.jpg", object: 2 },
    { url: "../Images/Card/35.jpg", object: 3 },
    { url: "../Images/Card/36.jpg", object: 2 },
    { url: "../Images/Card/37.jpg", object: 3 },
    { url: "../Images/Card/38.jpg", object: 4 },
    { url: "../Images/Card/39.jpg", object: 5 },
    { url: "../Images/Card/40.jpg", object: 3 },
    { url: "../Images/Card/41.jpg", object: 5 },
    { url: "../Images/Card/42.jpg", object: 4 },
    { url: "../Images/Card/43.jpg", object: 3 },
    { url: "../Images/Card/44.jpg", object: 2 },
    { url: "../Images/Card/45.jpg", object: 2 },
    { url: "../Images/Card/46.jpg", object: 4 },
    { url: "../Images/Card/47.jpg", object: 5 },
    { url: "../Images/Card/48.jpg", object: 1 }
];
var selectedOption = null;
var countdownInterval;
var gameImage = document.getElementById("game-image");
var popup = document.getElementById("popup");
var popupMessage = document.getElementById("popup-message");
var gameOverDiv = document.getElementById("gameOverMessage");

var popupRestartButton = document.getElementById("popup-restart");
var correctObjectsCount = 0;
var currentCard = null; // הקלף הנוכחי שהתחיל בו המשחק
var countdownTime = localStorage.getItem("level") === "1" ? 10 : 5; // הגדרת הזמן לפי הרמה שנבחרה ב- localStorage
var originalCountdownTime = countdownTime;
var width = 100;
// var rectangle = document.getElementById("rectangle");
var countCard = 0;


function shuffleArray(array) {
    // מערבבת את המערך באופן אקראי באמצעות אלגוריתם Fisher-Yates
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function* generateRandomNumbers() {
    const numbers = Array.from({ length: 48 }, (_, i) => i + 1); // יוצרת מערך של המספרים מ-1 עד 48
    shuffleArray(numbers); // מערבבת את המספרים במערך באופן אקראי

    for (const num of numbers) {
        yield num; // מחזירה מספר אקראי בכל פעם
    }
}

// יוצרת את המחולל
const numberGenerator = generateRandomNumbers();

//פותחת את העמוד מעל 
function openPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = "flex";
}

function closePopup() {
    popup.style.display = "none";
}

document.getElementById("popup-restart").addEventListener("click", closePopupAndRestart);

function closePopupAndRestart() {

    closePopup();
    displayRandomImage();
    resetCountdown();
}

function getRandomImage() {
    if (countCard === 48) {
        console.log("GAME OVER");
        restartGame();
    }
    countCard++;
    var randomIndex = numberGenerator.next().value;
    console.log(randomIndex);
    return imageArray[randomIndex];
}

function displayRandomImage() {
    var randomImage = getRandomImage();
    gameImage.src = randomImage.url;
    gameImage.setAttribute("data-object", randomImage.object);
    gameImage.style.pointerEvents = "none";
    currentCard = randomImage; // שמירת הקלף הנוכחי
}

function startCountdown() {
    var countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = countdownTime;
    countdownInterval = setInterval(function () {
        countdownTime--;
        countdownElement.innerHTML = countdownTime;
        if (countdownTime < 0) {
            clearInterval(countdownInterval);
            endGame();
        }
    }, 1000);
}

function resetCountdown() {
    stopAnimation();
    clearInterval(countdownInterval);
    countdownTime = originalCountdownTime;
    selectedOption = null;
    startAnimation();
    startCountdown();
}

function goToGameOverPage() {
    console.log(correctObjectsCount); // כאן תמלא את ערך הנקודות שצברת במשחק
    var nextPageURL = 'endGame.html?score=' + correctObjectsCount;
    window.open(nextPageURL, '_blank');
  }


function endGame() {
    stopAnimation();
    clearInterval(countdownInterval);
    selectedOption = null;
    openPopup(" קלפים נכונים: " + correctObjectsCount);
    startAnimation();
    playSound("failureAudio"); // ניגון הקול כאשר סיום המשחק
}

// פונקציה לניגון השמע (הפרמטר audioId הוא מזהה האודיו)
function playSound(audioId) {
    var audioElement = document.getElementById(audioId);
    audioElement.currentTime = 0; // איפוס זמן הניגון כדי לאפשר ניגון חוזר
    audioElement.play();
}

function openGameOver(message) {
    gameOverDiv.textContent = message;
    gameOverPopup.style.display = "flex";
}
function closeGameOver() {
    gameOverPopup.style.display = "none";

}
function restartGame() {
    goToGameOverPage();
    correctObjectsCount = 0;
    countCard = 0
    displayRandomImage();
    resetCountdown();
    // resetRectangle();
}

document.getElementById("game-image").addEventListener("click", function () {
    selectedOption = gameImage.getAttribute("data-object");
    if (selectedOption !== gameImage.getAttribute("data-object")) {
        endGame();
        playSound("failureAudio"); // ניגון הקול במקרה של כישלון
    } else {
        correctObjectsCount++;
        // stopAnimation();
        displayRandomImage();
        resetCountdown();
        playSound("successAudio"); // ניגון הקול במקרה של הצלחה
    }
});
var optionImages = document.querySelectorAll(".option-image");
optionImages.forEach(function (optionImage) {
    optionImage.addEventListener("click", function () {
        selectedOption = optionImage.getAttribute("data-object");
        if (selectedOption !== gameImage.getAttribute("data-object")) {
            endGame();
            playSound("failureAudio"); // ניגון הקול במקרה של כישלון
        } else {
            correctObjectsCount++;
            displayRandomImage();
            resetCountdown();
            playSound("successAudio"); // ניגון הקול במקרה של הצלחה
        }
    });
});

function resetCountdownDIV() {
    var animatedDiv = document.getElementById('animatedDiv');
    if (animatedDiv) {
        animatedDiv.style.height = '0'; // Reset the height to 0
    }
}

function stopAnimation() {
    var currentHeight = $('#animatedDiv').height(); // Get the current height
    $('#animatedDiv').stop().css('height', currentHeight); // Stop the animation and set height to current position
}


var animationStarted = false; // Variable to track if the animation has started
function startAnimation() {
    $('#animatedDiv').css('height', '0'); // Set the initial height to 0
    animationStarted = true;
    $('#animatedDiv').animate({ height: '100%' }, originalCountdownTime * 1000, 'linear', function () {
        animationStarted = false; // Animation completed, reset the flag
    }); // Start the animation
}




// Call the function when the document is ready

// Start the animation when the document is ready
$(document).ready(function () {
    startAnimation();
});
// קריאות הפונקציות הראשיות בכניסה לעמוד
displayRandomImage();
startCountdown();

const level1 = document.getElementById('l1');

level1.addEventListener('click', function() {
window.location.href = 'play.html';

});

const level2= document.getElementById('l2');

level2.addEventListener('click', function() {
window.location.href = 'play.html';

});

const home= document.getElementById('BackToHome');

home.addEventListener('click', function() {
window.location.href = 'start.html';

});
