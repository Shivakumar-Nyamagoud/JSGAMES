let boxes = document.querySelectorAll(".btn");
let reset_btn = document.querySelector(".btn-reset"); // Use querySelector for single elements
let new_btn = document.querySelector(".btn-new"); // Use querySelector for single elements
let msg_container = document.querySelector(".msg-container");

let turn0 = true;
let count =0;

const winArray = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8], // Corrected: was [6, 7, 5] which is invalid
];

// Corrected function placement
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msg_container.classList.add("hide"); // Hide the message container
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
    msg_container.classList.remove("hide"); // Show the message container
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winArray) {
        let val0 = boxes[pattern[0]].innerText;
        let val1 = boxes[pattern[1]].innerText;
        let val2 = boxes[pattern[2]].innerText;

        if (val0 !== "" && val1 !== "" && val2 !== "") {
            if (val0 === val1 && val1 === val2) {
                showWinner(val0);
                return; // Stop checking after a winner is found
            }
        }
    }
    if(count === 9){
        document.querySelector(".msg").innerText = `Match Draw`;
        msg_container.classList.remove("hide");
    }
};

// Add click event listeners to all boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        count ++;
        box.disabled = true;
        checkWinner();
        

    });
});
