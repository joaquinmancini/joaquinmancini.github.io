"use strict"
let suscription1 = 'html/suscription1.html';
let suscription2 = 'html/suscription2.html';
let suscription3 = 'html/suscription3.html';
let suscription4 = 'html/suscription4.html';
let faq = 'html/ayuda.html';
let inicio = 'html/inicio.html';
let start_sesion = 'html/logging.html';

firstLoad();

function firstLoad() {
  fetch(inicio).then(
      function (r) {
        r.text().then(function (r) {
          document.querySelector(".partial").innerHTML = r;
        })
      })
    .catch(function (response) {
      document.querySelector(".partial").innerHTML = "<h1>No es posible acceder en este momento, intente mas tarde,</h1>"
    });
}

function suscription_first_step() {
  fetch(suscription1).then(
      function (r) {
        r.text().then(function (r) {
          document.querySelector(".partial").innerHTML = r;
        })
      })
    .catch(function (response) {
      document.querySelector(".partial").innerHTML = "<h1>No es posible acceder en este momento, intente mas tarde,</h1>"
    });
}

function suscription_second_step() {
  fetch(suscription2).then(
      function (r) {
        r.text().then(function (r) {
          document.querySelector(".partial").innerHTML = r;
        })
      })
    .catch(function (response) {
      document.querySelector(".partial").innerHTML = "<h1>No es posible acceder en este momento, intente mas tarde,</h1>"
    });
}

function suscription_third_step() {
  fetch(suscription3).then(
      function (r) {
        r.text().then(function (r) {
          document.querySelector(".partial").innerHTML = r;
        })
      })
    .catch(function (response) {
      document.querySelector(".partial").innerHTML = "<h1>No es posible acceder en este momento, intente mas tarde,</h1>"
    });
}
function suscription_forth_step() {
  fetch(suscription4).then(
      function (r) {
        r.text().then(function (r) {
          document.querySelector(".partial").innerHTML = r;
        })
      })
    .catch(function (response) {
      document.querySelector(".partial").innerHTML = "<h1>No es posible acceder en este momento, intente mas tarde,</h1>"
    });
}
function logging() {
  fetch(start_sesion).then(
      function (r) {
        r.text().then(function (r) {
          document.querySelector(".partial").innerHTML = r;
        })
      })
    .catch(function (response) {
      document.querySelector(".partial").innerHTML = "<h1>No es posible acceder en este momento, intente mas tarde,</h1>"
    });
}
function home(){
  window.location.href = 'home.html';
}
function ayuda() {
  fetch(faq).then(
      function (r) {
        r.text().then(function (r) {
          document.querySelector(".partial").innerHTML = r;
        })
      })
    .catch(function (response) {
      document.querySelector(".partial").innerHTML = "<h1>No es posible acceder en este momento, intente mas tarde,</h1>"
    });
}


////// ANIMATION LOGIN /////

let anamationContainer = document.getElementsByClassName('animation-container');
let divHidden = document.getElementsByClassName('partial');
let animation = document.getElementsByClassName('circle');


function animationLogin(){
  divHidden[0].style.display = "none";
  animation[0].style.display = "block";
  anamationContainer[0].style.display = "block"
  setTimeout(() => {
    home();
  }, 2000);
}




