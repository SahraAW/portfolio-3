// Initialize game state variables
let secretNumber = Math.floor(Math.random() * 20) + 1; // Random number between 1 and 20
let score = 20;
let highscore = 0;

// Selecting elements
const guessInput = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const messageDisplay = document.querySelector('.message');
const scoreDisplay = document.querySelector('.score');
const highscoreDisplay = document.querySelector('.highscore');
const numberDisplay = document.querySelector('.number');

// Function to display message
const displayMessage = function (message) {
    messageDisplay.textContent = message;
};

// Check Button Click Event
checkButton.addEventListener('click', function () {
    const userGuess = Number(guessInput.value);

    // When there is no input
    if (!userGuess || userGuess < 1 || userGuess > 20) {
        displayMessage('⛔️ Please enter a number between 1 and 20!');

        // When the guess is correct
    } else if (userGuess === secretNumber) {
        displayMessage('🎉 Correct Number!');
        numberDisplay.textContent = secretNumber; // Show the secret number
        document.body.style.backgroundColor = '#60b347'; // Change background color on correct guess

        // Update the highscore if the current score is higher
        if (score > highscore) {
            highscore = score;
            highscoreDisplay.textContent = highscore;
        }

        // When the guess is wrong
    } else if (userGuess !== secretNumber) {
        if (score > 1) {
            displayMessage(userGuess > secretNumber ? '📈 Too high!' : '📉 Too low!');
            score--; // Decrease score
            scoreDisplay.textContent = score; // Update score display
            guessInput.value = ''; // Clear the input field
        } else {
            displayMessage('💥 You lost the game!');
            scoreDisplay.textContent = 0;
        }
    }
});

// Again Button Click Event (Reset Game)
againButton.addEventListener('click', function () {
    // Reset the game state
    score = 20;
    secretNumber = Math.floor(Math.random() * 20) + 1;

    // Reset display and input fields
    numberDisplay.textContent = '?';
    scoreDisplay.textContent = score;
    displayMessage('Start guessing...');
    guessInput.value = '';

    // Reset styling
    document.body.style.backgroundColor = '#222';
    numberDisplay.style.width = '15rem';
});
