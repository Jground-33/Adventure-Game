/*----- constants -----*/
const DOM = {
    x: 0,
    y: 350, // value in pixels
    height: 85,
    width: 45,
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
        if (this.outerRange > object.x && this.innerRange < (object.x + object.width) && this.y + this.height > object.y) {
            console.log(object);
            DOM.currentAnimation = 'died';
            document.querySelector('body').style.backgroundColor = 'black';
            promtCard.style.visibility = 'visible';
            promtCard.style.opacity = '1';
            startBtn.style.visibility = 'hidden';
        }
    },
    currentAnimation: 'idle', // idle, running, jumping, attacking;
}

const bombAnimation = [
    '../resources/bomb0.png',
    '../resources/bomb1.png'
]

const laserAnimation = [
    '../resources/laserBlast0.png',
    '../resources/laserBlast1.png',
]

const mosterAnimation = [
    '../resources/big_demon_run_anim_f0.png',
    '../resources/big_demon_run_anim_f1.png',
    '../resources/big_demon_run_anim_f2.png',
    '../resources/big_demon_run_anim_f3.png',
]

/*----- Classes -----*/
class Bomb {
    constructor(x) {
        this.x = x;
        this.y = 410;
        this.width = 50;
    }
}

class Monster {
    constructor(x) {
        this.x = x;
        this.y = 365;
        this.width = 60;
        this.relX = x;
    }
}

class Laser {
    constructor(x, y, relX) {
        this.x = x;
        this.y = y;
        this.height = 77;
        this.width = 104;
        this.relX = relX;
    }
    collisionDetection(monster, monsterIndex, laserIndex) {
        if (this.x + this.width > monster.x && this.x < (monster.x + monster.width)) { //&& this.y + this.height < monster.y
            alert('laser hit monster')
            // laserElems[laserIndex].remove()
            // monsterElems[monsterIndex].remove()
            // lasers.splice(laserIndex, 1)
            // monsters.splice(monsterIndex, 1)
        }
    }
}

/*----- app's (variables) -----*/
let score;
let animationIdx = 0;
let bombAnimationIdx = 0;
let monsterAnimationIdx = 0;
let bombs = [];
let monsters = [];
let lasers = [];
let gameOn = false;
let readyToStart = false;

/*----- cached element references -----*/
const promtCard = document.getElementById('promt-card');
const backgroundElem = document.getElementById('background');
const domRunnerElem = document.getElementById('DOM-runner');
const viewportElem = document.getElementById('viewport');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
let bombElems;
let monsterElems;
let laserElems;

/*----- creates bombs object arrat and bomb Element Node array -----*/
for (let i = 1; i < 7; i++) {
    let bomb = new Bomb(i * 750);
    let img = document.createElement('img');
    bombs.push(bomb);
    img.className = 'bomb';
    img.setAttribute('src', '../resources/bomb0.png');
    img.style.left = `${bomb.x}px`;
    backgroundElem.append(img);
}
bombElems = document.querySelectorAll('.bomb');

for (let i = 1; i < 7; i++) {
    let monster = new Monster(i * 900);
    let img = document.createElement('img');
    monsters.push(monster);
    img.className = 'monster';
    img.setAttribute('src', '../resources/big_demon_run_anim_f0.png');
    img.style.left = `${monster.x}px`;
    backgroundElem.append(img);
}
monsterElems = document.querySelectorAll('.monster');

/*----- event listeners -----*/
startBtn.addEventListener('click', () => {
    if (readyToStart) startNewGame();
});

resetBtn.addEventListener('click', () => {
    promtCard.style.visibility = 'hidden';
    promtCard.style.opacity = '0';
    if (!readyToStart) init();
});

window.addEventListener('keydown', function (event) {
    if (event.code === 'Space') event.preventDefault();
    if (event.key === 'ArrowUp' && DOM.currentAnimation === 'running' && gameOn) {
        DOM.currentAnimation = 'jumping';
        animationIdx = 1;
        DOM.yVelocity -= 20;
        animateJump();
    }
    if (event.code === 'Space' && DOM.currentAnimation !== 'attacking' && gameOn) { 
        DOM.currentAnimation = 'attacking';
        animationIdx = 0;
        spawnLaser()
    }
});

/*----- functions -----*/
init();

function init() {
    // initialises background color and start button visibility after death scene
    document.querySelector('body').style.backgroundColor = 'gray'
    startBtn.style.visibility = 'visible'
    // update the x position of runner, bombs, mosters, and the background Elem
    bombs.forEach((bomb, idx) => bomb.x = (idx + 1) * 750);
    monsters.forEach((monster, idx) => {
        monster.x = (idx + 1) * 900;
        monster.relX = (idx + 1) * 900;
        monsterElems[idx].style.left = `${monster.relX}px`;
    });
    DOM.x = 0;
    backgroundElem.style.transform = `translateX(${DOM.x}px)`;
    // initializes score, sets animation to idle and updates ready to start. 
    score = 0;
    DOM.currentAnimation = 'idle';
    readyToStart = true;
    render();
}

function startNewGame() {
    gameOn = true;
    animationIdx = 0;
    DOM.currentAnimation = 'running';
    backgroundscroll();
}

function render() {
    setTimeout(function () {
        //this renders DOM's idle animation
        if (DOM.currentAnimation === 'idle') {
            domRunnerElem.setAttribute('src', `${DOM.idleAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.idleAnimation.length - 1) animationIdx = 0;
        }

        //this renders the run animation
        else if (DOM.currentAnimation === 'running') {
            domRunnerElem.setAttribute('src', `${DOM.runAnimation[animationIdx]}`);
            animationIdx++
            if (animationIdx === DOM.runAnimation.length - 1) animationIdx = 0;
        }

        //this renders jump animation
        else if (DOM.currentAnimation === 'jumping') {
            domRunnerElem.setAttribute('src', `${DOM.jumpAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.jumpAnimation.length - 1) animationIdx = 0;
        }

        // this renders attack animation
        if (DOM.currentAnimation === 'attacking') {
            domRunnerElem.setAttribute('src', `${DOM.attackAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.attackAnimation.length - 1) {
                DOM.currentAnimation = 'running'
                animationIdx = 0;
            }
        }

        // this renders death animation
        if (DOM.currentAnimation === 'died') {
            domRunnerElem.setAttribute('src', `${DOM.dieAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.dieAnimation.length - 1) {
                animationIdx = 0;
                gameOn = false;
                readyToStart = false;
                return;
            }
        }

        // this renders bomb animation and runs collision detection on bomb objects 
        bombs.forEach((bomb, idx) => {
            bombElems[idx].setAttribute('src', `${bombAnimation[bombAnimationIdx]}`)
            // DOM.collisionDetection(bomb);
        })
        //this renders laser animation and runs collision detection on laser vs moster objects;
        laserElems = document.querySelectorAll('.laser')
        if (lasers.length > 0) {
            lasers.forEach((laser, laserIdx) => {
                laserElems[laserIdx].setAttribute('src', `${laserAnimation[bombAnimationIdx]}`);
                monsters.forEach((monster, monsterIdx) => laser.collisionDetection(monster, monsterIdx, laserIdx));
            })
        }
        bombAnimationIdx === 1 ? bombAnimationIdx = 0 : bombAnimationIdx++;

        // this renders monster animation and runs collision detection on monster objects 
        monsterElems = document.querySelectorAll('.monster')
        monsters.forEach((monster, idx) => {
            monsterElems[idx].setAttribute('src', `${mosterAnimation[monsterAnimationIdx]}`)
            // DOM.collisionDetection(monster);
        })
        monsterAnimationIdx++;
        if (monsterAnimationIdx > mosterAnimation.length - 1) monsterAnimationIdx = 0;

        // win case 
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
        DOM.yVelocity += .6;
        DOM.y += DOM.yVelocity;
        DOM.yVelocity *= 0.9;
        domRunnerElem.style.top = `${DOM.y}px`
        requestAnimationFrame(animateJump);
    }
}

function backgroundscroll() {
    if (DOM.currentAnimation === 'died') return;
    DOM.x -= 5
    backgroundElem.style.transform = `translateX(${DOM.x}px)`
    bombs.forEach(bomb => bomb.x -= 5)
    monsters.forEach((monster, idx) => {
        monster.x -= 7;
        monster.relX -= 2;
        monsterElems[idx].style.left = `${monster.relX}px`;
    });
    lasers.forEach((laser, idx) => {
        laser.x += 5;
        laser.relX += 10;
        laserElems[idx].style.left = `${laser.relX}px`;
    });
    requestAnimationFrame(backgroundscroll)
}


function spawnLaser() {
    //spawn laser object, push into lasers array, create DOM element
    let laser = new Laser(DOM.x + DOM.innerRange, DOM.y, DOM.innerRange + (Math.abs(DOM.x)))
    let img = document.createElement('img');
    lasers.push(laser);
    img.className = 'laser';
    img.setAttribute('src', '../resources/laserBlast0.png');
    img.style.left = `${laser.relX}px`;
    img.style.opacity = `.9`
    backgroundElem.append(img);
    laserElems = document.querySelectorAll('.laser');
}