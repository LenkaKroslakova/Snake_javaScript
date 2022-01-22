document.addEventListener("keydown", keyPush)

const canvas = document.querySelector("canvas");
const title = document.querySelector("h1");
const ctx = canvas.getContext("2d");

const snakeSize = 30;

let snakePosX = 0;
let snakePosY = canvas.height / 2 ;
let snakeSpeed = snakeSize;

let velocityX = 1;
let velocityY = 0;

let tail = [];
let snakeLenght = 2;

let foodPosX = 0;
let foodPosY = 0;

//game
const tileCountX = canvas.width / snakeSize
const tileCountY = canvas.height / snakeSize

let gameIsRunning = true;

let score = 0;
//
function gameLoop() {
    if ( gameIsRunning)
    {
    moveStuff()
    drawStuff()
    setTimeout(gameLoop, 1000/ 15);
    }
}

resetFood();
gameLoop();

function moveStuff() {
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

// wall collision
    if (snakePosX > (canvas.width - snakeSize)) {
        snakePosX = 0;
    }
    if (snakePosX < 0) {
        snakePosX = canvas.width;
    }
    
    if (snakePosY > (canvas.height - snakeSize)) {
        snakePosY = 0;
    }
    if (snakePosY < 0) {
        snakePosY = canvas.height;
    }

    //gAME OVER
    tail.forEach (snakePart => {
        if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
            gameIsRunning = false;
            title.textContent ="GAME OVER!";
        }
    })

    //tail
    tail.push({ x: snakePosX, y: snakePosY});

    // forgot earliesr parts of snake
    tail = tail.slice(-1 * snakeLenght);

    //food collision
    if ( snakePosX === foodPosX && snakePosY === foodPosY) {
        title.textContent = ++score;
        snakeLenght++;
        resetFood();
    }
}

function drawStuff () {
    rectangle("#99cccc",0, 0, canvas.width, canvas.height);

    drawGrid();
//food
    rectangle("#c5d165",foodPosX, foodPosY, snakeSize, snakeSize);

//tail
    tail.forEach ((snakePart) =>
    rectangle("#cc8099", snakePart.x, snakePart.y, snakeSize, snakeSize))

//snake
    rectangle("#B00B69",snakePosX, snakePosY, snakeSize, snakeSize);

}

function rectangle (color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height)
}

function resetFood() {

    foodPosX=(Math.floor(Math.random()* tileCountX)* snakeSize)
    foodPosY=(Math.floor(Math.random()* tileCountY)* snakeSize)
// DONT SPAN FOOD ON SNAKE HEAD
    if ( foodPosX === snakePosX && foodPosY === snakePosY) (
        resetFood()
    )
    // donst span foot on any part od snake 
    if (tail.some( 
        (snakePart) => snakePart.x === foodPosX && snakePart.y === foodPosY))
        {
            resetFood();
        }
}

function keyPush(event) {
    switch (event.key) {
        case "ArrowLeft":
            if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
        }
        break;
        case "ArrowRight":
            if (velocityY !== -1) {
            velocityX = 1;
            velocityY = 0;
        }
        break;
        case "ArrowDown":
            if (velocityY !== -1) {
            velocityX = 0;
            velocityY = 1;
        }
        break;
        case "ArrowUp":
            if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    }
        break;
        // game restart - any key
        default:
        if ( ! gameIsRunning) location.reload();
        break;
    }
}

function drawGrid() {
    for (let i=0; i < canvas.width / snakeSize; i++) {
        for (let j=0; j < canvas.height / snakeSize; j++) {
            rectangle ("white", snakeSize* i, snakeSize* j, snakeSize-1, snakeSize-1);
        }
    }
}