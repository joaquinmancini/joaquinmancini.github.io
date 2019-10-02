'use strict'
export class Joystick {
    constructor() {
        this.up = false;
        this.start = false;
    }
    keyListener(e) {
        let state = (e.type == "keydown") ? true : false;
        if (e.keyCode == 32) {
            this.up = state;
        }
        if (e.keyCode == 82) {
            this.start = state;
        }
    }
}