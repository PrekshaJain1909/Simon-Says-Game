let generate = [];
let userinput = [];
let colours = ["red", "purple", "green", "yellow"];
let start = false;
let gameOver = false;
let level = 1;
let score = 0;

let highest = localStorage.getItem("highestScore") || 0;
highest = parseInt(highest);

const heading2 = document.querySelector("h5");
const heading4 = document.querySelector("h4");
const body = document.querySelector("body");

function updateHighestDisplay() {
    heading2.innerText = `Highest Score : ${highest}`;
}
updateHighestDisplay();

function flashColor(color) {
    color.classList.add("flashwhite");
    setTimeout(() => color.classList.remove("flashwhite"), 200);
}

function sequence() {
    const randomIndex = Math.floor(Math.random() * 4);
    const id = colours[randomIndex];
    const color = document.querySelector(`.${id}`);
    generate.push(id);
    flashColor(color);
}

function levelup() {
    level++;
    heading4.innerText = `Level ${level}`;
}

function resetGame() {
    gameOver = false;
    start = false;
    level = 1;
    generate = [];
    userinput = [];
    heading4.innerHTML = `Game is over!! Your score is <b>${score}</b> <br><br>Press any key or click to restart`;

    if (score > highest) {
        highest = score;
        localStorage.setItem("highestScore", highest);
        updateHighestDisplay();
    }

    body.style.background = "#ff4c4c";
    setTimeout(() => {
        body.style.background = "linear-gradient(to right, #1d2b64, #f8cdda)";
    }, 500);
}

function checkAnswer(index) {
    return userinput[index] === generate[index];
}

function handleClick(color) {
    if (!start || gameOver) return;

    userinput.push(color);
    const button = document.querySelector(`.${color}`);
    button.classList.add("flash");
    setTimeout(() => button.classList.remove("flash"), 200);

    if (!checkAnswer(userinput.length - 1)) {
        resetGame();
    } else if (userinput.length === generate.length) {
        score++;
        levelup();
        userinput = [];
        setTimeout(sequence, 500);
    }
}

function startGame() {
    if (!start && !gameOver) {
        start = true;
        score = 0;
        level = 1;
        generate = [];
        userinput = [];
        heading4.innerText = `Level ${level}`;
        sequence();
    } else if (gameOver) {
        resetGame();
    }
}

document.querySelectorAll(".but").forEach(button => {
    button.addEventListener("click", () => handleClick(button.classList[0]));
});

document.addEventListener("keydown", startGame);
document.addEventListener("click", startGame);
document.getElementById("resetBtn").addEventListener("click", () => {
    gameOver = true;
    resetGame();
});

