/*----- constants -----*/
const DOM = {
    x: 145, // value based on relative to viewport 0x
    y: 350, // value based on relative to viewport 0y
    height: 85,
    width: 45,
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
        if (this.x + this.width > object.x && this.x < (object.x + object.width) && this.y + this.height > object.y) {
            console.log(object);
            DOM.currentAnimation = 'died';
            bodyElem.style.backgroundColor = 'black';
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
    }
}

class Laser {
    constructor(x, y) {
        this.height = 75;
        this.width = 100;
        this.x = x;
        this.y = y;
    }

    collisionDetection(monster, monsterIndex, laserIndex) {
        if (this.x + this.width > monster.x && this.x < (monster.x + monster.width) && this.y + this.height > monster.y) {
            laserElems[laserIndex].remove()
            monsterElems[monsterIndex].remove()
            lasers.splice(laserIndex, 1)
            monsters.splice(monsterIndex, 1)
        }
    }
}

/*----- app's (variables) -----*/
let score, bombs, monsters;
let bombDistance = 700;
let monsterDistance = 700;
let animationIdx = 0;
let bombAnimationIdx = 0;
let monsterAnimationIdx = 0;
let backgroundX = 0;
let lasers = [];
let gameOn = false;
let readyToStart = false; // might not need this bool

/*----- cached element references -----*/
const bodyElem = document.querySelector('body');
const startBtn = document.getElementById('start');
const backgroundElem = document.getElementById('background');
const domRunnerElem = document.getElementById('DOM-runner');
const promtCard = document.getElementById('promt-card');
const promtElem = document.getElementById('promt');
const resetBtn = document.getElementById('reset');
let bombElems = [];
let monsterElems = [];
let laserElems;


/*----- event listeners -----*/
startBtn.addEventListener('click', () => {
    if (readyToStart) startNewGame(); // might not need this bool
});

resetBtn.addEventListener('click', () => {
    promtCard.style.visibility = 'hidden';
    promtCard.style.opacity = '0';
    if (!readyToStart) init(); // might not need this bool
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
        spawnLaser();
    }
});

/*----- functions -----*/


init();

function init() {
    DOM.x = 145;
    // initialises background color and start button visibility after death scene
    bodyElem.style.backgroundColor = 'gray';
    startBtn.style.visibility = 'visible';
    // update the x position of runner, bombs, mosters, and the background Elem
    backgroundX = 0;
    backgroundElem.style.transform = `translateX(${backgroundX}px)`;
    if(bombElems.length > 0) bombElems.forEach(elem => elem.remove());
    if(monsterElems.length > 0) monsterElems.forEach(elem => elem.remove());
    bombs = [];
    monsters = [];
    createBombs(7);
    createMonsters(8);
    // initializes score, sets animation to idle and updates ready to start. 
    score = 0;
    DOM.currentAnimation = 'idle';
    readyToStart = true; // might not need this bool
    render();
}

function startNewGame() {
    if (!gameOn) {
        gameOn = true;
        animationIdx = 0;
        DOM.currentAnimation = 'running';
        backgroundscroll();
    }
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
            animationIdx++;
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
                DOM.currentAnimation = 'running';
                animationIdx = 0;
            }
        }

        // this renders death animation
        if (DOM.currentAnimation === 'died') {
            gameOn = false;
            readyToStart = false; // might not need this bool
            domRunnerElem.setAttribute('src', `${DOM.dieAnimation[animationIdx]}`);
            animationIdx++;
            if (animationIdx === DOM.dieAnimation.length - 1) {
                animationIdx = 0;
                return;
            }
        }

        // this renders bomb animation and runs collision detection on bomb objects 
        bombs.forEach((bomb, idx) => {
            bombElems[idx].setAttribute('src', `${bombAnimation[bombAnimationIdx]}`);


            // DOM.collisionDetection(bomb);       //////////////////////////////////////////BOMB COLLISION////////////////////////////////////////////////////////////


        })
        //this renders laser animation and runs collision detection on laser vs moster objects;
        laserElems = document.querySelectorAll('.laser');
        if (lasers.length > 0) {
            lasers.forEach((laser, laserIdx) => {
                if (laser.x > DOM.x + 100) {
                    laserElems[laserIdx].remove();
                    lasers.splice(laserIdx, 1);
                }
                laserElems[laserIdx].setAttribute('src', `${laserAnimation[bombAnimationIdx]}`);
                monsters.forEach((monster, monsterIdx) => laser.collisionDetection(monster, monsterIdx, laserIdx));
            })
        }
        bombAnimationIdx === 1 ? bombAnimationIdx = 0 : bombAnimationIdx++;

        // this renders monster animation and runs collision detection on monster objects 
        monsterElems = document.querySelectorAll('.monster')
        monsters.forEach((monster, idx) => {
            monsterElems[idx].setAttribute('src', `${mosterAnimation[monsterAnimationIdx]}`)


            DOM.collisionDetection(monster); //////////////////////////////////////////MONSTER COLLISION////////////////////////////////////////////////////////////


        })
        monsterAnimationIdx++;
        if (monsterAnimationIdx > mosterAnimation.length - 1) monsterAnimationIdx = 0;

        // win case 
        if (DOM.x > 5200) {
            DOM.x = 145;
            bodyElem.style.backgroundColor = 'black'
            promtCard.style.visibility = 'visible';
            promtElem.textContent = 'YOU WIN!!';
            promtElem.style.color = '#4F6377';
            resetBtn.textContent = 'PLAY AGAIN?';
            promtCard.style.opacity = '1';
            DOM.currentAnimation = 'idle'
            gameOn = false;
            readyToStart = false;
            return;
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
    if (!gameOn) return;
    DOM.x += 5
    backgroundX -= 5
    backgroundElem.style.transform = `translateX(${backgroundX}px)`
    monsters.forEach((monster, idx) => {
        monster.x -= 2;
        monsterElems[idx].style.left = `${monster.x}px`;
    });
    lasers.forEach((laser, idx) => {
        laser.x += 10;
        laserElems[idx].style.left = `${laser.x}px`;
    });
    requestAnimationFrame(backgroundscroll)
}

function createBombs(numBombs) {
    for (let i = 1; i <= numBombs; i++) {
        let bomb = new Bomb(i * bombDistance);
        let img = document.createElement('img');
        bombs.push(bomb);
        img.className = 'bomb';
        img.setAttribute('src', '../resources/bomb0.png');
        img.style.left = `${bomb.x}px`;
        backgroundElem.append(img);
    }
    bombElems = document.querySelectorAll('.bomb');
}

function createMonsters(numMonsters) {
    for (let i = 1; i <= numMonsters; i++) {
        let monster = new Monster(i * monsterDistance);
        let img = document.createElement('img');
        monsters.push(monster);
        img.className = 'monster';
        img.setAttribute('src', '../resources/big_demon_run_anim_f0.png');
        img.style.left = `${monster.x}px`;
        backgroundElem.append(img);
    }
    monsterElems = document.querySelectorAll('.monster');
}

function spawnLaser() {
    setTimeout(function () {
        //spawn laser object, push into lasers array, create DOM element
        let laser = new Laser(DOM.x, DOM.y)
        let img = document.createElement('img');
        lasers.push(laser);
        img.className = 'laser';
        img.setAttribute('src', '../resources/laserBlast0.png');
        img.style.top = `${laser.y + 25}px`
        img.style.left = `${laser.x}px`;
        img.style.opacity = `.9`
        backgroundElem.append(img);
        laserElems = document.querySelectorAll('.laser');
    }, 00)
}