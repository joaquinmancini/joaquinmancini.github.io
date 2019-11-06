'use strict'



document.addEventListener('DOMContentLoaded', function () {
    setInterval(() => {
        let reproductor = 'html/reproductorPelicula.html';
        let btnPlay = document.getElementsByClassName('btn-play');
        for  (let i = 0; i < btnPlay.length; i++) {
            btnPlay[i].addEventListener('click', e => play());
        }


        function play() {
            fetch(reproductor).then(
                    function (r) {
                        r.text().then(function (r) {
                            document.querySelector(".cuerpo").innerHTML = r;
                        })
                    })
                .catch(function (response) {
                    document.querySelector(".cuerpo").innerHTML = "<h1>No es posible acceder en este momento, intente mas tarde,</h1>"
                });
        }



    }, 500);
    setInterval(() => {
        let infoPage = 'html/resumen-pelicula.html'
        let btnInfo = document.getElementsByClassName('btn-info-header');
        
        for  (let i = 0; i < btnInfo.length; i++) {
            btnInfo[i].addEventListener('click', function(e){
                e.preventDefault();
                info();
            }); 
        }


        function info() {
            fetch(infoPage).then(
                    function (r) {
                        r.text().then(function (r) {
                            document.querySelector(".cuerpo").innerHTML = r;
                        })
                    })
                .catch(function (response) {
                    document.querySelector(".cuerpo").innerHTML = "<h1>No es posible acceder en este momento, intente mas tarde,</h1>"
                });
        }
    }, 500);

    
    



});