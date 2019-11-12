'use strict'
export class Avatar {
    constructor(w, h, x, y, l) {
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.life = l;
        this.jump = true;
        this.dead = true;
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
    jumping(j, a, audio) {
        if (j.up && !this.jump) {
            this.velY -= 15;
            a.style.background = "url('./img/jump.png')";
            a.style.animation = "anJumpA 1.25s steps(6)";
            audio.play();
            this.jump = true;
        }
        this.velY += 0.4;
        this.y += this.velY;
        this.velY *= 0.95;
    }
    //control piso
    checkFloor(playgroundRect, grHt, a) {
        if (this.y > playgroundRect.height - this.height - grHt) {
            this.jump = false;
            this.y = playgroundRect.height - this.height - grHt;
            this.velY = 0;
            //define nuevamente animacion de correr
            a.style.background = "url('./img/adb.png')";
            a.style.animation = "anRunA 1s steps(8) infinite";
        }
    }
    //muerte del personaje
    death(a) {
        this.dead = true;
        a.style.background = "url('./img/death.png') no-repeat";
        a.style.animation = "anDeathA 2s steps(6) forwards, anLayA 2s linear forwards";
    }
    //personaje herido
    hurt(l, a) {
        this.life -= 2;
        l.style.width = this.life + "px";
        a.style.background = "url('./img/hurt.png')";
        a.animation="anHurt 1s steps(4)";
    }
    start(a, lB, l) {
        this.life = 100;
        l.style.width = this.life + "px";
        lB.style.display = "inline";
        l.style.width = "100px";
        a.style.background = "url('./img/adb.png')";
        a.animation = "anRunA 1s steps(8) infinite";
    }
}