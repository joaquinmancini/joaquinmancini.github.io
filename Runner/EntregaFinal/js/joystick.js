'use strict'
export class Joystick {
    constructor() {
        this.up = false;
    }
    keyListener(e) {
        let state = (e.type == "keydown") ? true : false;
        if (e.keyCode == 32) {
            this.up = state;
        }
    }
}