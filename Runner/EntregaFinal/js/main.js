'use strict'
import {
    startGame
} from './game.js'
document.addEventListener("DOMContentLoaded", function () {
    function load(urlPartial) {
        fetch(urlPartial).then(
            function (response) {
                response.text().then(
                    function (texto) {
                        document.querySelector('.cuerpo').innerHTML = texto;
                    }
                )
            }
        )
    }
    //
    function firstPage() {
        load('html/runner.html');
        setTimeout(() => {
            startGame();
        }, 1200);
    }

    firstPage();
    let botones = document.querySelectorAll('.js_btn');
    botones[0].addEventListener('click', e => firstPage());
})