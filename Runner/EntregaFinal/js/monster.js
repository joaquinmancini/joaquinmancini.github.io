'use strict'
export class Monster {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.jump = true;
        this.dead = false;
    }
}