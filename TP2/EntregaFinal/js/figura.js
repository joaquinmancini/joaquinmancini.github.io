'use strict'
import {
    Circulo
} from "./circulo.js";
export class Figura {
    constructor() {
        this.circulos = [];
        this.centro;
        this.cerrada = false;
    }
    getCirc() {
        return this.circulos;
    }

    addCirc(circulo) {
        this.circulos.push(circulo);
    }

    getCentro() {
        return this.centro;
    }

    setCentro(x, y, r, c) {
        this.centro = new Circulo(x, y, r, c);
    }
    getCerrada() {
        return this.cerrada;
    }
    setCerrada(cerrada) {
        this.cerrada = cerrada;
    }
    //Crea un objeto circulo ylo agrega al arreglo de circulos
    createCircle(x, y, r, c) {
        let circulo = new Circulo(x, y, r, c);
        this.addCirc(circulo);
        return circulo;
    }
    //Traza linea dadas las coordenadas de dos circulos
    drawLine(ctx, x1, y1, x2, y2, lineColor) {
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    //Une circulos con lineas
    joinCircles(ctx, lineColor) {
        if ((this.getCirc().length) >= 2) {
            let arr = this.getCirc();
            let x1, y1, x2, y2;
            if (!this.cerrada) {
                x1 = arr[arr.length - 2].getCordX();
                y1 = arr[arr.length - 2].getCordY();
                x2 = arr[arr.length - 1].getCordX();
                y2 = arr[arr.length - 1].getCordY();
            } else {
                x1 = arr[0].getCordX();
                y1 = arr[0].getCordY();
                x2 = arr[arr.length - 1].getCordX();
                y2 = arr[arr.length - 1].getCordY();
            }
            this.drawLine(ctx, x1, y1, x2, y2, lineColor);
        }
    }
    joinAll(ctx, lineColor) {
        if (this.cerrada == true) {
            for (let i = 0, j = this.circulos.length - 1; i < this.circulos.length; j = i, i++) {
                this.drawLine(ctx, this.circulos[i].getCordX(), this.circulos[i].getCordY(), this.circulos[j].getCordX(), this.circulos[j].getCordY(), lineColor);
            }
        } else {
            for (let i = 0; i < this.circulos.length - 1; i++) {
                this.drawLine(ctx, this.circulos[i].getCordX(), this.circulos[i].getCordY(), this.circulos[i + 1].getCordX(), this.circulos[i + 1].getCordY(), lineColor);
            }
        }
    }

    //Calcula area del poligono
    calcArea(arr, nCirc) {
        let area = 0,
            j = nCirc - 1,
            circ1, circ2;
        for (let i = 0; i < nCirc; j = i++) {
            circ1 = arr[i];
            circ2 = arr[j];
            area += circ1.getCordX() * circ2.getCordY();
            area -= circ1.getCordY() * circ2.getCordX();
        }
        area /= 2;
        return area;
    }
    //Calcula centroide de poligono, pues el centro en poligonos irregulares queda fuera del poligono 
    calcCentroid(ctx, r, centerColor) {
        let arr = this.getCirc();
        let nCirc = arr.length;
        let x = 0,
            y = 0,
            j = nCirc - 1,
            f, circ1, circ2;
        for (let i = 0; i < nCirc; j = i++) {
            circ1 = arr[i];
            circ2 = arr[j];
            f = circ1.getCordX() * circ2.getCordY() - circ2.getCordX() * circ1.getCordY();
            x += (circ1.getCordX() + circ2.getCordX()) * f;
            y += (circ1.getCordY() + circ2.getCordY()) * f;
        }
        f = this.calcArea(arr, nCirc) * 6;
        x /= f;
        y /= f;
        this.setCentro(x, y, r, centerColor);
        this.getCentro().drawCircle(ctx);
    }
    //Compara coord del click con los circulos de una figura, si haya coincidencia retorna circulo
    checkCirc(x, y, r) {
        let x0 = 0,
            y0 = 0,
            d1 = 0;
        let fig = this;
        if (r == 7) {
            let cen = this.getCentro();
            if (cen != null) {
                x0 = cen.getCordX();
                y0 = cen.getCordY();
                d1 = Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2));
                if (d1 <= r) {
                    return fig;
                }
            }
        } else {
            let arr = this.getCirc();
            for (let i = 0; i < arr.length; i++) {
                x0 = arr[i].getCordX();
                y0 = arr[i].getCordY();
                d1 = Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2));
                if (d1 <= r) {
                    arr[i].setIsDragged(true);
                    return fig;
                }
            }
        }
    }
    //Calcula las nuevas coord en base a la posicion del centro
    newCoords(mX, mY) {
        let nX, nY;
        let dX = mX - this.centro.getCordX(),
            dY = mY - this.centro.getCordY();
        for (let i = 0; i < this.circulos.length; i++) {
            nX = this.circulos[i].getCordX() + dX;
            nY = this.circulos[i].getCordY() + dY;
            this.circulos[i].setCordX(nX);
            this.circulos[i].setCordY(nY);
        }
        this.centro.setCordX(mX);
        this.centro.setCordY(mY);
    }
    //Redibuja el canvas con las nuevas coord
    redraw(ctx, lineColor) {
        let arr = this.getCirc();
        for (let i = 0; i < arr.length; i++) {
            arr[i].drawCircle(ctx);
        }
        if (this.getCentro() != null) {
            let center = this.getCentro();
            center.drawCircle(ctx);
        }
        this.joinAll(ctx, lineColor);
    }
    //Setea isDragged a false para todos los circulos de una figura (excepto el centro)
    unDrag() {
        let cs = this.getCirc();
        for (let i = 0; i < cs.length; i++) {
            cs[i].setIsDragged(false);
        }
    }
    //Chequea si alguno de los circulos de la figura esta seteado a dragged
    checkDragged() {
        let cs = this.getCirc();
        for (let i = 0; i < cs.length; i++) {
            if (cs[i].getIsDragged()) {
                return cs[i];
            }
        }
    }
    deleteCirc() {
        let cs = this.getCirc();
        for (let i = 0; i < cs.length; i++) {
            if (cs[i].getIsDragged()) {
                cs.splice(i, 1);
            }
        }
    }
    changeCircColor(colorV, colorC) {
        for (let i = 0; i < this.circulos.length; i++) {
            this.circulos[i].setColor(colorV);
        }
        if (this.cerrada) {
            this.centro.setColor(colorC);
        }
    }
}