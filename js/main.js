/*----- constants -----*/
/*
 collision box for DOM 
    width: 45px;
    height: 85px;
    top: 365px;
    left: 135px;
*/
const DOM = {
    x: 0,
    y: 350, // value in pixels
    height: 85,
    yVelocity: 0,
    innerRange: 135, // left side of DOM
    outerRange: 180, // right side of DOM
    runAnimation: [
        '../resources/v2.1/Indvidual Sprites/adventurer-run-00-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-run-01-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-run-02-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-run-03-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-run-04-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-run-05-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-run-04-1.3.png',
    ],
    jumpAnimation: [
        '../resources/v2.1/Indvidual Sprites/adventurer-jump-00-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-jump-01-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-jump-02-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-jump-03-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-jump-03-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-jump-02-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-jump-01-1.3.png',
    ],
    dieAnimation: [
        '../resources/v2.1/Indvidual Sprites/adventurer-die-00-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-die-01-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-die-02-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-die-03-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-die-04-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-die-05-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-die-06-1.3.png',
    ],
    attackAnimation: [
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-02-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-03-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-04-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-05-1.3.png',
    ],
    idleAnimation: [
        '../resources/v2.1/Indvidual Sprites/adventurer-idle-00-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-idle-00-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-idle-01-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-idle-01-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-idle-02-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-idle-02-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-idle-03-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-idle-03-1.3.png',
    ],
    collisionDetection: function (object) {
        if (this.outerRange > object.x && this.innerRange < (object.x + object.width) && this.y + this.height > 410) { // ready to test collision detection.
            DOM.currentAnimation = 'died';
            document.querySelector('body').style.backgroundColor = 'black'
            startBtn.style.visibility = 'hidden'
        }
    },
    currentAnimation: 'idle', // idle, running, jumping, attacking;
}

const bombAnimation = [
    '../resources/bomb0.png',
    '../resources/bomb1.png'
]

/*----- Classes -----*/
class Bomb {
    constructor(x) {
        this.x = x;
        this.y = 50;
        this.width = 50;
    }
}

/*----- app's (variables) -----*/
let score;
let animationIdx = 0;
let BAIdx = 0;
let bombs = [];
let gameOn = false;



/*----- cached element references -----*/
const backgroundElem = document.getElementById('background');
const domRunnerElem = document.getElementById('DOM-runner');
const viewportElem = document.getElementById('viewport');
const startBtn = document.getElementById('start');
let bombElems;


/*----- event listeners -----*/
window.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp' && DOM.currentAnimation === 'running') {
        DOM.currentAnimation = 'jumping';
        animationIdx = 1;
        DOM.yVelocity -= 20;
        animateJump()
    }
    if (event.code === 'KeyA' && DOM.currentAnimation !== 'attacking') {
        DOM.currentAnimation = 'attacking';
        animationIdx = 0;
    }
})

startBtn.addEventListener('click', (event) => {
    if (gameOn) startNewGame()
})

/*----- functions -----*/

init();

function init() {
    DOM.x = 0;
    // creates Bombs and bomb elements 
    for (let i = 1; i < 7; i++) {
        let bomb = new Bomb(i * 750);
        let img = document.createElement('img');
        bombs.push(bomb)
        img.className = 'bomb'
        img.setAttribute('src', '../resources/bomb0.png')
        img.style.left = `${bomb.x}px`;
        backgroundElem.append(img)
    }
    bombElems = document.querySelectorAll('.bomb');
    score = 0;
    gameOn = true;
}

function startNewGame() {
    DOM.currentAnimation = 'running'
    backgroundscroll()
}


render()
function render() {
    setTimeout(function () {
        //this will render DOM's idle animation
        if (DOM.currentAnimation === 'idle') {
            domRunnerElem.setAttribute('src', `${DOM.idleAnimation[animationIdx]}`)
            animationIdx++
            if (animationIdx === DOM.idleAnimation.length - 1) animationIdx = 0;
        }
        //this will render the run animation
        else if (DOM.currentAnimation === 'running') {
            domRunnerElem.setAttribute('src', `${DOM.runAnimation[animationIdx]}`)
            animationIdx++
            if (animationIdx === DOM.runAnimation.length - 1) animationIdx = 0;
        }
        //this will render jump animation
        else if (DOM.currentAnimation === 'jumping') {
            domRunnerElem.setAttribute('src', `${DOM.jumpAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.jumpAnimation.length - 1) {
                animationIdx = 0;
            }
        }
        // this will render attack animation
        if (DOM.currentAnimation === 'attacking') {
            domRunnerElem.setAttribute('src', `${DOM.attackAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.attackAnimation.length - 1) {
                DOM.currentAnimation = 'running'
                animationIdx = 0;
            }
        }
        // renders death animation
        if (DOM.currentAnimation === 'died') {
            domRunnerElem.setAttribute('src', `${DOM.dieAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.dieAnimation.length - 1) {
                gameOn = false;
                return;
            }
        }
        // this renders bomb animation 
        bombElems.forEach((elem, idx) => {
            elem.setAttribute('src', `${bombAnimation[BAIdx]}`)
            DOM.collisionDetection(bombs[idx]);
        })
        if (BAIdx === 1) BAIdx = 0
        else BAIdx++
        if (DOM.x < -5100) {
            alert(`you've won!!!`)
            DOM.currentAnimation = 'idle'
        }

        requestAnimationFrame(render);
    }, 150)
}

function animateJump() {
    if (DOM.y > 350) {
        DOM.y = 350
        DOM.yVelocity = 0
        domRunnerElem.style.top = `${DOM.y}px`
        DOM.currentAnimation = 'running'
        return
    } else {
        DOM.yVelocity += .6; // gravity
        DOM.y += DOM.yVelocity;
        DOM.yVelocity *= 0.9; // friction
        domRunnerElem.style.top = `${DOM.y}px`
        requestAnimationFrame(animateJump);
    }
}

function backgroundscroll() {
    if (DOM.currentAnimation === 'died') return;
    DOM.x -= 4
    backgroundElem.style.transform = `translateX(${DOM.x}px)`
    bombs.forEach(bomb => bomb.x -= 4)
    requestAnimationFrame(backgroundscroll)
}