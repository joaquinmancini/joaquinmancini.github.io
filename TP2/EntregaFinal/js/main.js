'use strict'
import {
    Figura
} from "./figura.js";
document.addEventListener('DOMContentLoaded', function () {
    let pers = 50;
    let lineColor = "hsl(60, 100%, " + pers + "%)",
        centerColor = "hsl(120, 100%, " + pers + "%)",
        vertColor = "hsl(0, 100%, " + pers + "%)",
        bgr = "hsl(180, 55%, 35%)";
    let canv = defineCanvas(800, 600);
    let ctx = drawCanvas(canv);
    let figuras = [];
    let closeB = document.querySelector(".closeB");
    let clearC = document.querySelector(".clearC");
    let r1 = 10,
        r2 = 7;
    let target;
    // Variables de manejo
    let dragok = false,
        pressed = false;
    //E.L. para clickDown dentro de canvas
    canv.addEventListener("mousedown", function (e) {
        let event = e;
        mouseDown(event);
    })
    //E.L. para clickUp dentro de canvas
    canv.addEventListener("mouseup", function (e) {
        let event = e;
        mouseUp(event);
    })
    //E.L. para clickMove dentro de canvas
    canv.addEventListener("mousemove", function (e) {
        let event = e;
        mouseMove(event);
    })
    //E.L. para click en boton cerrar
    closeB.addEventListener("click", function (e) {
        closePol();
    })
    //E.L. para limpiar canvas
    clearC.addEventListener("click", function (e) {
        figuras = [];
        ctx = drawCanvas(canv);
    })
    //E.L. para dobleclick en boton cerrar
    canv.addEventListener("dblclick", function (e) {
        let event = e;
        doubleClick(event);
    })
    //E.L. para tecla presionada
    document.addEventListener("keydown", function (e) {
        let event = e;
        if (event.keyCode == 67) {
            pressed = true;
            document.addEventListener("wheel", function (e) {
                let dY = e.deltaY;
                changeCol(dY);
            })
        }
    })
    document.addEventListener("keyup", function (e) {
        pressed = false;
    })
    //Definicion de canvas
    function defineCanvas(w, y) {
        let canv = document.querySelector("canvas");
        canv.width = w;
        canv.height = y;
        return canv;
    }
    //Creacion de canvas
    function drawCanvas(canv) {
        let ctx = canv.getContext("2d");
        ctx.fillStyle = bgr;
        ctx.fillRect(0, 0, canv.width, canv.height);
        return ctx;
    }
    //Devuelve (x,y) de clickDown
    function mouseDown(e) {
        let pX = e.layerX;
        let pY = e.layerY;
        target = clickCirc(pX, pY);
        dragok = false;
        if (target == null) {
            setPol(pX, pY, r1);
        } else {
            dragok = true;
        }
    }
    //Devuelve (x,y) de clickUp
    function mouseUp(e) {
        dragok = false;
        if (target != null) {
            target.unDrag();
        }
    }
    //Devuelve (x,y) de clickMove
    function mouseMove(e) {
        if (dragok) {
            let mX = e.layerX;
            let mY = e.layerY;
            let dragged = target.checkDragged();
            if (dragged != null) {
                dragged.setCordX(mX);
                dragged.setCordY(mY);
                if (target.getCerrada()) {
                    target.calcCentroid(ctx, r2, centerColor);
                }
            } else {
                target.newCoords(mX, mY);
            }
            ctx = drawCanvas(canv);
            for (let i = 0; i < figuras.length; i++) {
                figuras[i].redraw(ctx, lineColor);
            }
        }
    }
    //Define ultimo poligono como cerrado y une 1° circulo con ultimo
    function closePol() {
        let figura = figuras[figuras.length - 1];
        if (figura.getCirc().length > 2) {
            figura.setCerrada(true);
            figura.joinCircles(ctx, lineColor);
            figura.calcCentroid(ctx, r2, centerColor);
        }
    }
    //Agrega una figura al arreglo de figuras
    function addFigura() {
        let figura = new Figura();
        figuras.push(figura);
        return figura;
    }
    //Comienza un poligono nuevo o agrega circulos al ultimo que no ha sido cerrado
    function setPol(x, y, r) {
        let figura;
        if (figuras.length === 0 || (figuras[figuras.length - 1].getCerrada())) {
            figura = addFigura();
            let circulo = figura.createCircle(x, y, r, vertColor);
            circulo.drawCircle(ctx);
        } else {
            figura = figuras[figuras.length - 1];
            let circulo = figura.createCircle(x, y, r, vertColor);
            circulo.drawCircle(ctx);
            figura.joinCircles(ctx, lineColor);
        }
    }
    //Detecta  si se clickeo sobre un circulo
    function clickCirc(x, y) {
        for (let i = 0; i < figuras.length; i++) {
            target = figuras[i].checkCirc(x, y, r2);
            if (target != null) {
                return target;
            } else {
                target = figuras[i].checkCirc(x, y, r1);
                if (target != null) return target;
            }
        }
    }
    //Detecta dobleclick sobre punto
    function doubleClick(e) {
        let dX = e.layerX;
        let dY = e.layerY;
        target = clickCirc(dX, dY);
        if (target != null) {
            target.deleteCirc();
            ctx = drawCanvas(canv);
            target.calcCentroid(ctx, r2, centerColor);
            for (let i = 0; i < figuras.length; i++) {
                figuras[i].redraw(ctx, lineColor);
            }
            for (let i = 0; i < figuras.length; i++) {
                if (figuras[i].getCerrada() && figuras[i].getCirc().length == 0) {
                    figuras.splice(i, 1);
                }

            }
        }
    }
    //Cambia intensidad de color de todas las figuras 
    function changeCol(dY) {
        let ratio = 1 / 50;
        if (pressed) {
            if (dY == 100) {
                if (pers < 100 - ratio) {
                    pers += ratio;
                }
            } else if (dY == -100) {
                if (pers > 0 + ratio) {
                    pers -= ratio;
                }
            }
            lineColor = "hsl(60, 100%, " + pers + "%)";
            centerColor = "hsl(120, 100%, " + pers + "%)";
            vertColor = "hsl(0, 100%, " + pers + "%)";

            for (let i = 0; i < figuras.length; i++) {
                figuras[i].changeCircColor(vertColor, centerColor);
                figuras[i].redraw(ctx, lineColor);
            }
        }
    }

})