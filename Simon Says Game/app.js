let generate = [];
let userinput = [];
let colours = ["red", "purple", "green", "yellow"];
let start = false;
let gameOver = false;
let x = 1;
let score = 0;
let highest = 0;

function levelup() {
    return ++x;
}

let heading2 = document.querySelector("h5");
heading2.innerHTML = `Highest Score : ${highest}`;

function sequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let id = colours[randomNumber];
    let color = document.querySelector(`.${id}`);
    generate.push(id);
    color.classList.add("flashwhite");
    setTimeout(function() {
        color.classList.remove("flashwhite");
    }, 200);
}

function gameStarted() {
    if (!start && !gameOver) {
        start = true;
        score = 0; // Reset the score at the start of the game
        let heading = document.querySelector("h4");
        heading.innerText = `Level ${x}`;
        sequence();
    } else if (gameOver) {
        // Reset the game state
        gameOver = false;
        start = false;
        x = 1;
        generate = [];
        userinput = [];
        let heading = document.querySelector("h4");
        heading.innerHTML = `Game is over!! Your score is <b>${score}</b> <br> <br>Press any key to Restart the game`;
        heading2.innerHTML = `Highest Score : ${highest}`;
    }
}

function checkans(index) {
    return userinput[index] === generate[index];
}

function keeptrack() {
    let buttons = document.querySelectorAll(".but");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            if (start && !gameOver) {
                let butt = this;
                userinput.push(butt.classList[0]); // Store the color class in userinput array
                console.log(userinput);

                // Flash the button when clicked
                butt.classList.add("flash");
                setTimeout(function() {
                    butt.classList.remove("flash");
                }, 200);

                if (!checkans(userinput.length - 1)) {
                    let bodyy = document.querySelector("body");
                    bodyy.style.backgroundColor = "red";
                    setTimeout(function() {
                        bodyy.style.backgroundColor = "antiquewhite";
                    }, 200);
                    gameOver = true; // Set gameOver to true
                    start = false; // Reset start to false
                    // Update highest score if current score is higher
                    if (score > highest) {
                        highest = score;
                    }
                    
                } else if (userinput.length === generate.length) {
                    // If the user's input matches the sequence
                    score++;
                    x = levelup();
                    userinput = [];
                    let heading = document.querySelector("h4");
                    heading.innerText = `Level ${x}`;
                    setTimeout(sequence, 500); // Add a delay before showing the next sequence
                }
            }
        });
    });
}

document.addEventListener("keypress", function() {
    gameStarted(); // Reset the game when a key is pressed after game over
});

document.addEventListener("click", function() {
    gameStarted(); // Reset the game when a click occurs after game over
});

keeptrack();
