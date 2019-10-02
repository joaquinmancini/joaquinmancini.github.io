'use strict'
export class Bcr {
    constructor() {
        this.plgrBCR;
        this.advtBCR;
        this.impBCR;
        this.lfBCR;
    }
    getBCR(p, a, i, l) {
        this.plgrBCR = p.getBoundingClientRect();
        this.advtBCR = a.getBoundingClientRect();
        this.impBCR = i.getBoundingClientRect();
        this.lfBCR = l.getBoundingClientRect();
    }
}