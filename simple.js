document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".btn");
    let reset_btn = document.querySelector(".btn-reset");
    let new_btn = document.querySelector(".btn-new");
    let msg_container = document.querySelector(".msg-container");

    // Ask for player names after the page is fully loaded
    let player1 = prompt("Enter player name");
    let player2 = prompt("Enter another player name");
    let turn = player1; 
    let count = 0;

    const winArray = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    const resetGame = () => {
        turn = player1;
        count = 0;
        enableBoxes();
        msg_container.classList.add("hide");
    };

    reset_btn.addEventListener("click", resetGame);
    new_btn.addEventListener("click", resetGame);

    const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerHTML = "";
        }
    };

    const disableBoxes = () => {
        for (let box of boxes) {
            box.disabled = true;
        }
    };

    const showWinner = (winner) => {
        document.querySelector(".msg").innerText = `Winner is ${winner}`;
        msg_container.classList.remove("hide");
        disableBoxes();
    };

    const checkWinner = () => {
        for (let pattern of winArray) {
            let val0 = boxes[pattern[0]].innerText;
            let val1 = boxes[pattern[1]].innerText;
            let val2 = boxes[pattern[2]].innerText;

            if (val0 !== "" && val1 !== "" && val2 !== "") {
                if (val0 === val1 && val1 === val2) {
                    let winner = val0 === "O" ? player1 : player2;
                    showWinner(winner);
                    return;
                }
            }
        }
        if (count === 9) {
            document.querySelector(".msg").innerText = `It's a Draw!`;
            msg_container.classList.remove("hide");
        }
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (turn === player1) {
                box.innerText = "O";
                turn = player2;
            } else {
                box.innerText = "X";
                turn = player1;
            }
            count += 1;
            box.disabled = true;
            checkWinner();
        });
    });
});
