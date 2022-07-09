export default class Coin {
    constructor(x) {
        this.x = x;
        this.y = 275;
        this.height = 20;
        this.width = 20;
        this.coinSound = new Audio('./assets/341695__projectsu012__coins-1.wav')
    }
    collisionDetection(runner, coinIndex) {
        if (runner.x + runner.width > this.x && runner.x < (this.x + this.width) && runner.y + runner.height > this.y && runner.y < this.y + this.height) {
            window.score += 100;
            document.getElementById('DOMscore').textContent = `Score:${window.formatWithPadding(window.score)}`
            window.coins.splice(coinIndex, 1)
            window.coinElems[coinIndex].remove();
            this.coinSound.play();
        }
    }
}
