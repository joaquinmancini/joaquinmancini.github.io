'use strict'
export class Bcr {
    constructor() {
        this.plgrBCR;
        this.advtBCR;
        this.impBCR;
        this.ppBCR;
        this.lfBCR;
    }
    getBCR(p, a, i, pp, l) {
        this.plgrBCR = p.getBoundingClientRect();
        this.advtBCR = a.getBoundingClientRect();
        this.impBCR = i.getBoundingClientRect();
        this.ppBCR = pp.getBoundingClientRect();
        this.lfBCR = l.getBoundingClientRect();
    }
}