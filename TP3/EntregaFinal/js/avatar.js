'use strict'
export class Avatar {
    constructor(width, height, x, y, lc) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.lifeCounter = lc;
        this.jump = true;
        this.attack = false;
        this.dead = false;
    }
    //chequea si hay colision de dos objetos
    collision(avatarRect, objRect) {
        let d = this.distance(avatarRect, objRect);
        if ((avatarRect.width + objRect.width) / 2 >= d) {
            return true;
        }
    }
    //distancia entre avatar y un objeto
    distance(avatarRect, objRect) {
        return Math.sqrt((Math.pow(objRect.x - avatarRect.x, 2) + Math.pow(objRect.y - avatarRect.y, 2)))
    }
    //salto de avatar
    jump() {

    }
    //control piso
    checkFloor(playgroundRect, grHt, adventurer) {
        if (this.y > playgroundRect.height - this.height - grHt) {
            this.jump = false;
            this.y = playgroundRect.height - this.height - grHt;
            this.velY = 0;
            //define nuevamente animacion de correr
            adventurer.style.background = "url('../img/adb.png')";
            adventurer.style.animation = "anRunA 1s steps(8) infinite";
        }
    }
    death(adventurer) {
        this.dead = true;
        adventurer.style.background = "url('../img/death.png') no-repeat";
        adventurer.style.animation = "anDeathA 2s steps(6) forwards, anLayA 2s linear forwards";

    }
    hurt(life) {
        this.lifeCounter-=2;
        life.style.width = this.lifeCounter + "px";
        
    }
}