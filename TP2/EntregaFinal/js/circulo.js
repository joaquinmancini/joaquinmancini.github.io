'use strict'
export class Circulo {
    constructor(cordX, cordY, rad, color) {
        this.cordX = cordX;
        this.cordY = cordY;
        this.rad = rad;
        this.color = color;
        this.isDragged = false;
    }

    getCordX() {
        return this.cordX;
    }

    setCordX(cordX) {
        this.cordX = cordX;
    }

    getCordY() {
        return this.cordY;
    }

    setCordY(cordY) {
        this.cordY = cordY;
    }

    getRad() {
        return this.rad;
    }

    setRad(rad) {
        this.rad = rad;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getIsDragged() {
        return this.isDragged;
    }

    setIsDragged(isDragged) {
        this.isDragged = isDragged;
    }

    changeCord(x, y) {
        this.setCordX(x);
        this.setCordY(y);
    }
    //Dibuja un circulo en canvas
    drawCircle(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let x = this.getCordX();
        let y = this.getCordY();
        ctx.arc(x, y, this.rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }


}