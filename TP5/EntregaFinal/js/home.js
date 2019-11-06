'use strict'
function game404(){
    window.location.href = 'game404.html';
  }
  function reproductor(){
    window.location.href = 'html/reproductorPelicula.html';

  }
  function reproductorSerie(){
    window.location.href = 'html/reproductorSerie.html';

  }
  function miCuenta(){
    window.location.href = 'mi-cuenta.html';
  }
  function cerrarSesion(){
    window.location.href = 'index.html';

  }
document.addEventListener('DOMContentLoaded', function () {
    
    let btns = document.getElementsByClassName("nav-item");
    let nav = document.getElementsByClassName("navbar-collapse");

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
    load('html/general.html');
    //botones principales
    let jsBtn = document.getElementsByClassName("js-btn");
    jsBtn[0].addEventListener('click', e => load('html/general.html'));
    jsBtn[1].addEventListener('click', e => load('html/general.html'));
    jsBtn[2].addEventListener('click', e => load('html/peliculas.html'));
    jsBtn[3].addEventListener('click', e => load('html/series.html'));
    jsBtn[4].addEventListener('click', e => load('html/favoritos.html'));







    let menuBtn = document.getElementsByClassName("navbar-toggler");
    let icon = document.getElementsByClassName("material-icons");
    menuBtn[0].addEventListener('click', function () {
        if (menuBtn[0].classList.contains("burger")) {
            menuBtn[0].classList.remove("burger");
            icon[0].innerHTML = "menu";
        } else {
            icon[0].innerHTML = "close";
            menuBtn[0].classList.add("burger");
        }
    });

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            if (nav[0].classList.contains("show")) {
                nav[0].classList.remove("show");
                menuBtn[0].classList.remove("burger");
                icon[0].innerHTML = "menu";
            }
        });
    }
    let ics = document.getElementsByClassName("ics");
    for (let i = 0; i < ics.length; i++) {
        ics[i].addEventListener('click', e => e.preventDefault());
    }
})

setInterval(() => {
let button = document.querySelector('.button');
let buttonText = document.querySelector('.tick');

const tickMark = "<svg width=\"58\" height=\"45\" viewBox=\"0 0 58 45\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" fill-rule=\"nonzero\" d=\"M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65\"/></svg>";

buttonText.innerHTML = "&#8594;";

button.addEventListener('click', function() {

  if (buttonText.innerHTML !== "&#8594;") {
    buttonText.innerHTML = "&#8594;";
  } else if (buttonText.innerHTML === "&#8594;") {
    buttonText.innerHTML = tickMark;
  }else{
    buttonText.innerHTML = "&#8594;";

  }
  this.classList.toggle('button__circle');
});
}, 500);


