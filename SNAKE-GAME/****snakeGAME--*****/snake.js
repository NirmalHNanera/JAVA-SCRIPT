
// Game's Constants & Variables
let velocity = {x: 0, y: 0};
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [{x: 13, y: 15}];
let food = {x: 6, y: 7};

const foodSound = new Audio('SnakeGameSounds/foodSound.m4a');
const bgSound = new Audio('SnakeGameSounds/bgMusic.m4a');
const gameOver = new Audio('SnakeGameSounds/GameOver.m4a');


// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    createGame();
}



function isCollide(sg){
    for (let i = 1; i < snakeArray.length; i++) {
        if (sg[i].x === sg[0].x && sg[i].y === sg[0].y){
            return true;
        }
    }
    
    if (sg[0].x >= 30 || sg[0].x <= 0 || sg[0].y >= 30 || sg[0].y <= 0){
        return true;
    }
    return false;
}





function createGame(){

    if(isCollide(snakeArray)){
        gameOver.play();
        bgSound.pause();
        // document.getElementById('mainSection').innerHTML = '';
        // document.getElementById('mainSection').style.background = "url('./SnakeGameImages/gameover.jpg')";
        // document.getElementById('mainSection').style.backgroundSize = "100vw 100vh";
        // window.requestAnimationFrame(main);
        gameOver.play();
        alert("Game Over!");
        velocity = {x: 0, y: 0};
        snakeArray = [{x: 13, y: 15}];
        score = 0;
        speed = 5;
    }

    //if snake have eaten the food, increment the score & regenerate the food.
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        score++;
        // Increase Speed
        if(score%5 === 0){
            speed += 2;
        }
        if(score>highScore){
            highScore = score;
            localStorage.setItem("hiScore", JSON.stringify(highScore));
            highScoreBox.innerHTML = "High Score : "+highScore;
        }
        scoreBox.innerHTML = "Score : "+score;
        snakeArray.unshift({x: snakeArray[0].x + velocity.x, y: snakeArray[0].y + velocity.y});
        let a = 2
        let b = 29;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }



    // Moving Snake
    for (let i=snakeArray.length-2; i>=0; i--){
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += velocity.x;
    snakeArray[0].y += velocity.y;



    // Display Snake & Food.
    board.innerHTML = "";
    snakeArray.forEach((e, i) => {
        snakeElement = document.createElement('uuu');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (i === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('uuu');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




let hiScore = localStorage.getItem("hiScore");
if(hiScore === null){
    highScore = 0;
    localStorage.setItem("hiScore", JSON.stringify(highScore));
}
else{
    highScore = JSON.parse(hiScore);
    highScoreBox.innerHTML = "High Score : "+hiScore;
}





// Main Logic Start Here

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    bgSound.play();
    velocity = {x: 0, y: 1}                     //Start Game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            velocity.x = 0;
            velocity.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            velocity.x = 0;
            velocity.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            velocity.x = -1;
            velocity.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            velocity.x = 1;
            velocity.y = 0;
            break;
        default:
            break;
    }
})