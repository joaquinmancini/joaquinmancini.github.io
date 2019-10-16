'use strict'

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
    load('html/tp4.html');
    let botones = document.querySelectorAll('.js_btn');
    botones[0].addEventListener('click', e => load('html/tp4.html'));
    botones[1].addEventListener('click', e => load('html/mobile.html'));
    botones[2].addEventListener('click', e => load('html/web.html'));    
    botones[3].addEventListener('click', e => load('html/prototipos.html'));
})