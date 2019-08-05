/*----- constants -----*/
const BACKGROUNDWIDTH = 5000;
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
    yVelocity: 0,
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
        '../resources/v2.1/Indvidual Sprites/adventurer-die-06-1.3.png'
    ],
    attackAnimation: [
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-02-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-03-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-04-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-05-1.3.png'
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
        if (object.x === this.x && object.y === this.y) {
            console.log(`collided with ${object}`)
        }
    },
    currentAnimation: 'idle', // idle, running, jumping, attacking;
}

/*----- Classes -----*/
class Bomb {
    constructor(x) {
        this.x = x;
        this.y = 50;
    }
}



/*----- app's (variables) -----*/
let score;
let animationIdx = 0;
let bombs = [];

/*----- cached element references -----*/
const backgroundEl = document.getElementById('background');
const domRunnerEl = document.getElementById('DOM-runner');
// const container = document.getElementById('viewport');

/*----- event listeners -----*/
window.addEventListener('keydown', function (event) {
    this.console.log(event)
    if (event.key === 'ArrowUp' && DOM.currentAnimation === 'running') {
        DOM.currentAnimation = 'jumping';
        animationIdx = 1;
        DOM.yVelocity -= 20;
        animateEaseY()
    }
    if (event.code === 'Space' && DOM.currentAnimation !== 'attacking') {
        DOM.currentAnimation = 'attacking';
        animationIdx = 0;
    }
})

/*----- functions -----*/

startNewGame();

function startNewGame() {
    let score = 0;
    DOM.currentAnimation = 'running'

    for (let i = 1; i < 5; i++) {
        let bomb = new Bomb(i * 1000);
        bombs.push(bomb)
        let img = document.createElement('img');
        img.style.left = `${bomb.x }px`;
        img.append(backgroundEl);
    }
    backgroundscroll()
    render()
}

function render() {
    setTimeout(function () {
        //this will render DOM's idle animation
        if (DOM.currentAnimation === 'idle') {
            domRunnerEl.setAttribute('src', `${DOM.idleAnimation[animationIdx]}`)
            animationIdx++
            if (animationIdx === DOM.idleAnimation.length - 1) animationIdx = 0;
        }
        //this will render the run animation
        else if (DOM.currentAnimation === 'running') {
            domRunnerEl.setAttribute('src', `${DOM.runAnimation[animationIdx]}`)
            animationIdx++
            if (animationIdx === DOM.runAnimation.length - 1) animationIdx = 0;
        }
        //this will render jump animation
        else if (DOM.currentAnimation === 'jumping') {
            domRunnerEl.setAttribute('src', `${DOM.jumpAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.jumpAnimation.length - 1) {
                animationIdx = 0;
            }
        }
        // this will render attack animation
        if (DOM.currentAnimation === 'attacking') {
            domRunnerEl.setAttribute('src', `${DOM.attackAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.attackAnimation.length - 1) {
                DOM.currentAnimation = 'running'
                animationIdx = 0;
            }
        }
        requestAnimationFrame(render);
    }, 125)
}

function animateEaseY() {
    if (DOM.y > 350) {
        DOM.y = 350
        DOM.yVelocity = 0
        domRunnerEl.style.top = `${DOM.y}px`
        DOM.currentAnimation = 'running'
        return
    } else {
        DOM.yVelocity += .6; // gravity
        DOM.y += DOM.yVelocity;
        DOM.yVelocity *= 0.9; // friction
        domRunnerEl.style.top = `${DOM.y}px`
        requestAnimationFrame(animateEaseY);
    }
}

function backgroundscroll() {
    setTimeout(() => {
        if (DOM.x < -5000) {
            alert(`you've won!!!`)
            return
        }
        DOM.x -= 1;
        backgroundEl.style.transform = `translateX(${DOM.x}px)`
        backgroundscroll();
    }, 5);
}