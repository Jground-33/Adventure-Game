/*----- constants -----*/
const RUN_ANIMATION = [
    '../resources/v2.1/Indvidual Sprites/adventurer-run-00-1.3.png',
    '../resources/v2.1/Indvidual Sprites/adventurer-run-01-1.3.png',
    '../resources/v2.1/Indvidual Sprites/adventurer-run-02-1.3.png',
    '../resources/v2.1/Indvidual Sprites/adventurer-run-03-1.3.png',
    '../resources/v2.1/Indvidual Sprites/adventurer-run-04-1.3.png',
    '../resources/v2.1/Indvidual Sprites/adventurer-run-05-1.3.png',
    '../resources/v2.1/Indvidual Sprites/adventurer-run-04-1.3.png',
]


/*----- app's state (variables) -----*/
let x = 0;
let runIdx = 0

/*----- cached element references -----*/
const background = document.getElementById('container');
const domRunner = document.getElementById('DOM-runner');

/*----- event listeners -----*/
// window.addEventListener('keydown', function (event) {
//     this.console.log(event)
//     if (event.key === 'ArrowRight') {
//         x += 50
//     }
//     if (event.key === 'ArrowLeft')  {
//         x -= 50
//     }

//     // if (event.key === ' ') // jump 
//     // if (event.code === 'KeyF') // fire 
// })

/*----- functions -----*/
function render() {
    setTimeout(function () {
        x -= 3;
        background.style.transform = `translateX(${x}px)`
        domRunner.setAttribute('src', `${RUN_ANIMATION[runIdx]}`)
        runIdx++
        if (runIdx === RUN_ANIMATION.length - 1) runIdx = 0;
        requestAnimationFrame(render);
    }, 100)
}

// requestAnimationFrame(render);
