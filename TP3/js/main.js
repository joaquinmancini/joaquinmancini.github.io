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
        }, 1000);
    }

    firstPage();
    let botones = document.querySelectorAll('.js_btn');
    botones[0].addEventListener('click', e => load('html/ej1.html'));
    botones[1].addEventListener('click', e => load('html/ej2.html'));
    botones[2].addEventListener('click', e => load('html/ej3.html'));
    botones[3].addEventListener('click', e => load('html/ej4.html'));
    botones[4].addEventListener('click', e => load('html/ej5.html'));
    botones[5].addEventListener('click', e => firstPage());
})