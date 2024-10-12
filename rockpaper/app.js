let userScore = 0;
let compScore = 0;

let userScorepara = document.querySelector("#user-score");
let compScorepara = document.querySelector("#comp-score");

const choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");

const genComChoice = () => {
    let options = ["rock", "paper", "scissors"];
    let randomIx = Math.floor(Math.random() * 3);
    return options[randomIx];
};

const drawGame = () => {
    msg.innerHTML = "Game was a Draw! Play again.";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, comChoice) => {
    if (userWin) {
        userScore++;
        userScorepara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${comChoice}.`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorepara.innerText = compScore;
        msg.innerText = `You Lose! ${comChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor = "red";
    }
};

const playGame = (userChoice) => {
    let comChoice = genComChoice();

    if (userChoice === comChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = comChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = comChoice === "scissors" ? false : true;
        } else {
            userWin = comChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, comChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
