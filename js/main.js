/*----- constants -----*/
const BACKGROUNDWIDTH = 5000;
const DOM = {
    x: 0,
    y: 0,
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
        '../resources/v2.1/Indvidual Sprites/adventurer-jump-01-1.3.png'
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
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-00-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-03-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-04-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-05-1.3.png'
    ],
    collisionDetection: function (object) {
        if (object.x === this.x && object.y === this.y) {
            console.log(`collided with ${object}`)
        }
    },
    jumping: false,
    attacking: false,
    running: true,
}

/*----- Classes -----*/
class Obstacle {
    constructor(xpos, ypos) {
        this.x = xpos;
        this.y = ypos;
    }
}


/*----- app's state (variables) -----*/
const win = 10000
let score;
let animationIdx = 0;

/*----- cached element references -----*/
const backgroundEl = document.getElementById('background');
const domRunnerEl = document.getElementById('DOM-runner');

/*----- event listeners -----*/
window.addEventListener('keydown', function (event) {
    this.console.log(event)
    if (event.key === 'ArrowUp' && DOM.jumping === false) {
        DOM.jumping = true;
        DOM.running = false;
        DOM.attacking = false;
        animationIdx = 0;
        DOM.y = 1;
    }
    if (event.code === 'Space' && DOM.attacking === false) {
        DOM.attacking = true;
        DOM.jumping = false;
        DOM.running = false;
        animationIdx = 0;
    }
})

/*----- functions -----*/
render()

function render() {
    setTimeout(function () {
        //this will render the run animation
        if (DOM.running === true) {
            domRunnerEl.setAttribute('src', `${DOM.runAnimation[animationIdx]}`)
            animationIdx++
            if (animationIdx === DOM.runAnimation.length - 1) animationIdx = 0;
        }
        //this will render jump animation
        else if (DOM.jumping === true) {
            domRunnerEl.setAttribute('src', `${DOM.jumpAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.jumpAnimation.length - 1) {
                DOM.jumping = false;
                DOM.running = true;
                animationIdx = 0;
            }
        }
        // this will render attack animation
        if (DOM.attacking === true) {
            domRunnerEl.setAttribute('src', `${DOM.attackAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.attackAnimation.length - 1) {
                DOM.attacking = false;
                DOM.running = true;
                animationIdx = 0;
            }
        }
        requestAnimationFrame(render);
    }, 125)
}

backgroundscroll()

function backgroundscroll() {
    setTimeout(() => {
        DOM.x -= 1;
        backgroundEl.style.transform = `translateX(${DOM.x}px)`
        backgroundscroll();
    }, 5);
}