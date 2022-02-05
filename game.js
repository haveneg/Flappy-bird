const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let keysDown = {};

let delay = 16.666;

let stage = 0;

let score = 0;

let highscore = 0;

let newHighscore = "false";

var sound;

//flappy bird image
var birdImg = new Image(30, 30);

birdImg.src = 'flappy-bird.png';

//actual flappy-bird game object
const bird = {
    x: 40,
    y: 20,
    width: 30,
    height: 20,
    yke: 0,
    gpe: 0.7,
    jumpHeight: 1
}

//creating and running pipes
class Pipe {
    constructor(x) {
        this.x = x;
        this.gapPosition = Math.floor(Math.random() * (canvas.height - 300)) + 150;
        this.gapHeight = 100;
        this.scoreCarrier = 12456543456;
    }
    pipeMove() {
        if (stage == 1) {
            this.x = this.x - 10;
        }
    }
    pipeDraw() {
        ctx.fillStyle = "green";
        ctx.strokeStyle = 'black';
        ctx.fillRect(this.x, 0, 60, this.gapPosition - this.gapHeight);
        ctx.strokeRect(this.x, 0, 60, this.gapPosition - this.gapHeight);
        ctx.fillRect(this.x, this.gapPosition + this.gapHeight, 60, canvas.height);
        ctx.strokeRect(this.x, this.gapPosition + this.gapHeight, 60, canvas.height);
    }
    pipeCheck() {
        if (this.x < -70) {
            this.pipeReset(canvas.width);
        }
        if (bird.x + bird.width >= this.x && bird.x < this.x + 60 && (bird.y + bird.height >= this.gapPosition + this.gapHeight || bird.y <= this.gapPosition - this.gapHeight)) {
            gameOver();
        }
        if (bird.x > this.x + 60 && this.scoreCarrier > 0) {
            score++;
            this.scoreCarrier = 0;
        }
    }
    pipeReset(x) {
        this.x = x;
        this.gapPosition = Math.floor(Math.random() * (canvas.height - 300)) + 150;
        this.scoreCarrier = 1;
    }
}

const pipe1 = new Pipe(canvas.width);
const pipe2 = new Pipe(canvas.width + 500);

//gravity & bird constraints
function gravity() {
    if (stage == 1) {
        bird.yke = bird.yke-bird.gpe;
        bird.y = bird.y - bird.yke;
    }
}
function birdConstraint() {
    if (bird.y + bird.height > canvas.height) {
        gameOver();
    }
}

//ends the game and returns to main menu
function gameOver() {
    if (score > highscore) {
        highscore = score;
        newHighscore = "true";
    }
    stage = 0;
}


//Inputs
addEventListener('keypress', function(event) {
    if (event.code == "Space" && stage == 1) {
        bird.yke = 15;
    } else if (event.code == "Space" && stage == 0) {
        score = 0;
        newHighscore = "false";
        pipe1.pipeReset(canvas.width);
        pipe2.pipeReset(canvas.width + 700);
        bird.y = 10;
        bird.yke = 0;
        stage = 1;
    }
});

/*addEventListener('keydown', function(event) {
    keysDown[event.keyCode] = true;
});

addEventListener('keyup', function(event) {
    delete keysDown[event.keyCode];
});

function Input() {
    if (37 in keysDown) {
        bird.x = bird.x - 3;
    }
    if (39 in keysDown) {
        bird.x = bird.x + 3
    }
}*/

//draws the screen
function draw() {
    if (stage == 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        //ground
        ctx.fillStyle = '#964B00';
        ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
        //player
        ctx.fillStyle = "red";
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        //pipes
        pipe1.pipeDraw();
        pipe2.pipeDraw();
        ctx.fillStyle = "white";
        ctx.font = "20px Verdana";
        ctx.fillText("Score: " + score, 10, 30);
    } else if (stage == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '50px Courier New';
        ctx.fillText("Flappy-Bird", (canvas.width / 2) - 180, (canvas.height / 2) - 100);
        ctx.fillRect((canvas.width / 2) - 245, (canvas.height / 2) - 65, 490, 130);
        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.fillRect((canvas.width / 2) - 240, (canvas.height / 2) - 60, 480, 120);
        ctx.font = '30px Verdana';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.fillText("Press Space to Play", (canvas.width / 2) - 160, (canvas.height / 2) + 15);
        ctx.strokeText("Press Space to Play", (canvas.width / 2) - 160, (canvas.height / 2) + 15);
        ctx.fillText("Score: " + score, (canvas.width / 2) - 70, (canvas.height / 2) + 100);
        ctx.fillText("Highscore: " + highscore, (canvas.width / 2) - 100, (canvas.height / 2) + 150);
        if (newHighscore == "true") {
            ctx.font = "50px Courier New";
            ctx.fillStyle = 'rgb(200, 50, 50)';
            ctx.strokeStyle = "white";
            ctx.strokeText("New Highscore!", (canvas.width / 2) - 200, (canvas.height / 2) + 200);
            ctx.fillText("New Highscore!", (canvas.width / 2) - 200, (canvas.height / 2) + 200);
        }
    }
}

function main() {
    draw();
    gravity();
    birdConstraint();
    pipe1.pipeMove();
    pipe1.pipeCheck();
    pipe2.pipeMove();
    pipe2.pipeCheck();
    setTimeout(function() {
        requestAnimationFrame(main);
    }, delay);
}

document.addEventListener('DOMContentLoaded', main); 