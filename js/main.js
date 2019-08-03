/*----- constants -----*/
const DOM = {
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
        '../resources/v2.1/Indvidual Sprites/adventurer-jump-00-1.3.png'
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
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-01-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-02-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-03-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-04-1.3.png',
        '../resources/v2.1/Indvidual Sprites/adventurer-attack2-05-1.3.png'
    ],
    jumping: false,
    attacking: false,
    running: true,
}


/*----- app's state (variables) -----*/
let score;
let x = 0;
let animationIdx = 0

/*----- cached element references -----*/
const backgroundEl = document.getElementById('container');
const domRunnerEl = document.getElementById('DOM-runner');

/*----- event listeners -----*/
window.addEventListener('keydown', function (event) {
    this.console.log(event)
    if (event.key === 'ArrowUp') {
        DOM.jumping = true;
        DOM.running = false;
        DOM.attacking = false;
        animationIdx = 0;
        requestAnimationFrame(renderJump);
    }
    /*  if (event.code === ' ')  {
        DOM.attacking = true;
        DOM.jumping = true;
        DOM.running = false;
        animationIdx = 0;
        requestAnimationFrame(renderAttack);
    }
    */
})

/*----- functions -----*/


function renderRun() {
    setTimeout(function () {
        if (DOM.running === true) {
            DOM.jumping = false;
            // x -= 3;
            // backgroundEl.style.transform = `translateX(${x}px)`
            domRunnerEl.setAttribute('src', `${DOM.runAnimation[animationIdx]}`)
            animationIdx++
            if (animationIdx === DOM.runAnimation.length - 1) animationIdx = 0;
            requestAnimationFrame(renderRun);
        }
    }, 100)
}

// renderRun()

function renderJump() {
    setTimeout(function () {
        if (DOM.jumping === true) {
            DOM.running = false;
            domRunnerEl.setAttribute('src', `${DOM.jumpAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.jumpAnimation.length - 1) {
                DOM.jumping = false;
                DOM.running = true;
                animationIdx = 0;
                requestAnimationFrame(renderRun);
            } else requestAnimationFrame(renderJump);
        }
    }, 150)
}

// renderJump() 