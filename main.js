const canvas = document.getElementById("canvas");
const gameOver = document.getElementById("gameover");
const ctx = canvas.getContext("2d");
function range(start, end) {
    const list = [];
    for (const i of Array(end).keys()) {
        const newI = start + i;
        if (newI >= end)
            break;
        list.push(newI);
    }
    list.push(end);
    return list;
}
/// <reference path="./Game.ts"/>
/// <reference path="../init.ts"/>
class Player {
    update(game) {
        const { gs, x, y } = game;
        ctx.fillStyle = "lime";
        ctx.fillRect(x * gs, y * gs, gs - 2, gs - 2);
        return this;
    }
}
/// <reference path="../init.ts"/>
/// <reference path="Game.ts"/>
class Enemy {
    constructor(game) {
        this.game = game;
        this.enemy = [];
        this.stop = false;
        this.size = game.gs - 2;
    }
    update() {
        const { gs } = this.game;
        this.enemy = this.enemy.filter(i => i.x > -1).map(i => {
            // showing img
            ctx.fillStyle = "red";
            ctx.fillRect(i.x * gs, i.y * gs, this.size, this.size);
            this.getHit(i.x, i.y);
            return { x: i.x - 0.1, y: i.y };
        });
        return this;
    }
    add() {
        /**
         * Get last y coordinate
         */
        const { game, enemy } = this;
        const lastCoor = enemy.slice(enemy.length > 2 ? enemy.length - 2 : 0);
        const yCoor = [...Array(7).keys()];
        const newYCoor = yCoor
            .filter(i => !lastCoor.some(j => i === j.y))[Math.floor(Math.random() * 2)];
        /**
         * New x coordinate
         */
        const xCoor = range(game.tx, game.tx + 4);
        const newXCoor = xCoor[Math.floor(Math.random() * xCoor.length)];
        // Push new coordinate
        if (this.stop) {
            this.enemy = [];
        }
        else if (this.enemy.length < 5) {
            this.enemy.push({ x: newXCoor, y: newYCoor });
        }
        return this;
    }
    getHit(x, y) {
        const side = this.size / this.game.gs;
        const xHit = this.game.x + side >= x &&
            x + side >= this.game.x;
        const yHit = this.game.y + side >= y &&
            this.game.y <= y + side;
        if (xHit && yHit) {
            this.stop = true;
            this.game.stop();
        } // gameover
    }
}
/// <reference path="../init.ts"/>
/// <reference path="./Player.ts"/>
/// <reference path="./Enemy.ts"/>
const player = new Player();
class Game {
    constructor() {
        this.xv = 0; // speed
        this.yv = 0; // speed
        this.x = 1;
        this.y = 1; // coordinate player
        this.gs = 80; // grid side 
        this.tx = 10; //  tongle x
        this.ty = 5; // tongle y
        this.enemy = new Enemy(this);
    }
    updateMove(key) {
        const keyCodeIs = (code) => key.keyCode === code;
        if (keyCodeIs(37) && this.x >= 0) { // left
            this.xv = -0.4;
            this.yv = 0;
        }
        if (keyCodeIs(38) && this.y >= 0) { // up
            this.xv = 0;
            this.yv = -0.4;
        }
        if (keyCodeIs(39) && this.x <= this.tx - 1) { // right
            this.xv = 0.4;
            this.yv = 0;
        }
        if (keyCodeIs(40) && this.y <= this.ty - 1) { //down
            this.xv = 0;
            this.yv = 0.4;
        }
    }
    update() {
        this.x += this.xv;
        this.y += this.yv;
        this.stopMove();
        this.draw();
        this.reset();
        return this;
    }
    stopMove() {
        if (this.x <= 0 ||
            this.x >= this.tx - 2 ||
            this.y <= 0 ||
            this.y >= this.ty - 2) {
            this.reset();
        }
    }
    reset() {
        this.xv = 0;
        this.yv = 0;
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        player.update(this);
        this.enemy.add().update();
    }
    stop() {
        gameOver.style.visibility = "visible";
        this.reset();
        this.x = this.y = 1;
    }
    start() {
        gameOver.style.visibility = "hidden";
        this.enemy.stop = false;
    }
}
/// <reference path="./d/Game.ts"/>
/// <reference path="./init.ts"/>
const game = new Game();
document.getElementById("tryagain").addEventListener('click', () => {
    game.start();
});
document.addEventListener('keydown', (key) => {
    game.updateMove(key);
});
setInterval(() => game.update().draw(), 60);
