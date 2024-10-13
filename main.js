// spille starter
let secretNumber = Math.floor(Math.random() * 20) + 1; //  alle nummer mellem 1 and 20
let score = 0;
let highscore = Infinity;
let guesses = []; // huske tal

// elements
const guessInput = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const messageDisplay = document.querySelector('.message');
const scoreDisplay = document.querySelector('.score');
const highscoreDisplay = document.querySelector('.highscore');
const numberDisplay = document.querySelector('.number');
const body = document.querySelector('body');

// Function to display a message to the user
const displayMessage = function (message) {
    messageDisplay.textContent = message;
};

// functon til huske gæt på
const updateGuessHistory = function (guess) {
    guesses.push(guess);
    document.querySelector('.message').textContent = `Guesses so far: ${guesses.join(', ')}`;
};

// Button click
checkButton.addEventListener('click', function () {
    const userGuess = Number(guessInput.value);

    // Validate the input
    if (!userGuess || userGuess < 1 || userGuess > 20) {
        displayMessage('⛔️ Enter a valid number between 1 and 20!');
        return;
    }


    updateGuessHistory(userGuess);

    // korrect
    if (userGuess === secretNumber) {
        displayMessage('🎉 Correct Number!');
        numberDisplay.textContent = secretNumber; // hvis det secret nummer
        body.style.backgroundColor = '#60b347'; // ændrer farver

        // hvis scoren er for lav
        if (score < highscore) {
            highscore = score;
            highscoreDisplay.textContent = highscore;
        }
        // Clear input
        guessInput.value = '';
        confetti(); // Trigger confetti


    } else {
        // når gæt er forkert start spil om
        score++;
        scoreDisplay.textContent = score;
        guessInput.value = ''; // roder alt

        // giv feedback om score er for højt eller lavt
        displayMessage(userGuess > secretNumber ? '📈 Too high!' : '📉 Too low!');

    }
});

//  Again button reset
againButton.addEventListener('click', function () {
    score = 0;
    guesses = [];
    secretNumber = Math.floor(Math.random() * 20) + 1; // nyt nummer

    // Reset UI elements
    scoreDisplay.textContent = score;
    highscoreDisplay.textContent = highscore;
    numberDisplay.textContent = '?';
    displayMessage('Start guessing...');
    guessInput.value = '';

    // Reset baggrund farver and gæt  histore
    body.style.backgroundColor = '#222';
});



// Confetti
function confetti() {
    const confettiCount = 5;
    const defaults = {
        spread: 360,
        ticks: 60,
        gravity: 0.5,
        decay: 0.9,
        startVelocity: 30,
        shapes: ['square', 'circle'],
        colors: ['#bb0000', '#ffffff'],
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    confetti({
        particleCount: confettiCount,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { y: 0.6 },
        colors: ['#bb0000', '#ffffff'],
    });
}

