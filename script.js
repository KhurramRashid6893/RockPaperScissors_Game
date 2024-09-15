let userScore = 0;
let compScore = 0;

const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const resultMessage_div = document.getElementById("result-message");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");
const restartButton_div = document.getElementById("restart-button");

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function game(userChoice) {
    if (userScore === 10 || compScore === 10) {
        return;  // Game over, stop further play
    }

    const computerChoice = getComputerChoice();
    let resultMessage;

    switch (userChoice + computerChoice) {
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            resultMessage = `You played ${capitalize(userChoice)}. Computer played ${capitalize(computerChoice)}.<br><br>${capitalize(userChoice)} beats ${capitalize(computerChoice)}.<br><br> You win!`;
            win(userChoice, computerChoice);
            break;
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            resultMessage = `You played ${capitalize(userChoice)}. Computer played ${capitalize(computerChoice)}.<br><br>${capitalize(computerChoice)} beats ${capitalize(userChoice)}.<br><br> You lose!`;
            lose(userChoice, computerChoice);
            break;
        default:
            resultMessage = `You both played ${capitalize(userChoice)}. It's a draw!`;
            draw(userChoice, computerChoice);
            break;
    }

    resultMessage_div.innerHTML = `<p>${resultMessage}</p>`;
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    checkGameOver();
}

function lose(userChoice, computerChoice) {
    compScore++;
    compScore_span.innerHTML = compScore;
    checkGameOver();
}

function draw(userChoice, computerChoice) {
    checkGameOver();
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function checkGameOver() {
    if (userScore === 10) {
        resultMessage_div.innerHTML += "<p>You reached 10 points! You won the game!</p>";
        showRestartButton();
    } else if (compScore === 10) {
        resultMessage_div.innerHTML += "<p>Computer reached 10 points. You lost the game!</p>";
        showRestartButton();
    }
}

function showRestartButton() {
    restartButton_div.classList.remove("hidden");

    // Disable click events on rock, paper, scissors by removing the listeners
    rock_div.removeEventListener('click', playRock);
    paper_div.removeEventListener('click', playPaper);
    scissors_div.removeEventListener('click', playScissors);
}

function restartGame() {
    // Reset scores
    userScore = 0;
    compScore = 0;

    // Reset UI
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    resultMessage_div.innerHTML = "<p>Make your move!</p>";

    // Hide restart button
    restartButton_div.classList.add("hidden");

    // Re-enable event listeners for rock, paper, scissors
    rock_div.addEventListener('click', playRock);
    paper_div.addEventListener('click', playPaper);
    scissors_div.addEventListener('click', playScissors);
}

// Event listener callback functions for rock, paper, and scissors
function playRock() { game("rock"); }
function playPaper() { game("paper"); }
function playScissors() { game("scissors"); }

// Attach event listeners
rock_div.addEventListener('click', playRock);
paper_div.addEventListener('click', playPaper);
scissors_div.addEventListener('click', playScissors);

// Attach click event to restart button
restartButton_div.querySelector("button").onclick = restartGame;
