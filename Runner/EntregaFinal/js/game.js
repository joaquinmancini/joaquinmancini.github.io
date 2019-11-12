import {
    Avatar
} from "./avatar.js";
import {
    Monster
} from "./monster.js";
import {
    Joystick
} from "./joystick.js";
import {
    Bcr
} from "./bcr.js";

export function startGame() {
    //objetos
    let avatar, joystick, bcr;
    let myID, distCounter = 0,
        previousDistance = 0,
        health = 100;
    let win = false,
        colliding = false;
    let audio_collect = new Audio('./sound/collect.wav'),
        audio_jump = new Audio('./sound/jump.wav'),
        audio_hit = new Audio('./sound/hit.wav'),
        audio_victory = new Audio('./sound/victory.mp3'),
        audio_death = new Audio('./sound/death.mp3');
    //obtencion de elementos
    let p1 = document.querySelector('.HillsLayer01'),
        p2 = document.querySelector('.HillsLayer02'),
        p3 = document.querySelector('.HillsLayer03'),
        p4 = document.querySelector('.HillsLayer04'),
        playground = document.querySelector('.HillsLayer05'),
        p6 = document.querySelector('.HillsLayer06'),
        st = document.querySelectorAll('.start-text'),
        rst = document.querySelectorAll('.restart-text'),
        wst = document.querySelectorAll('.win-text'),
        adventurer = document.querySelector('.avatar'),
        ip = document.querySelector('.ip'),
        pp = document.querySelector('.pa'),
        lifeBorder = document.querySelector('.lifeMeter'),
        life = document.querySelector('.lifeMeter2'),
        dist = document.querySelector('.distance'),
        inicio = document.querySelector('.inicio'),
        front = document.querySelector('.FrontGround');
    bcr = new Bcr();

    //obtencion de propiedades de elementos
    bcr.getBCR(playground, adventurer, ip, pp, life);
    //definicion de altura de 'piso'
    let groundHeight = bcr.plgrBCR.height - bcr.advtBCR.height - (bcr.advtBCR.top - bcr.plgrBCR.top);
    //definicion de objetos
    avatar = new Avatar(bcr.advtBCR.width, bcr.advtBCR.height, bcr.advtBCR.x, bcr.advtBCR.y, health);
    joystick = new Joystick();
    //funcion loop que toma las modificaciones del juego hasta que ocurra condicion
    function loop() {
        if (!avatar.dead && !win) {
            //obtener propiedades de elementos
            bcr.getBCR(playground, adventurer, ip, pp, life);
            //aumentar distancia e imprimirla
            distCounter++;
            printDist(distCounter, previousDistance, dist);
            if (previousDistance == 5) {
                stop("win");
                audio_victory.play();
                cancelAnimationFrame(myID);
            }
            //salto personaje
            avatar.jumping(joystick, adventurer, audio_jump);
            //controlar que no pase del piso
            avatar.checkFloor(bcr.plgrBCR, groundHeight, adventurer);
            adventurer.style.top = avatar.y + "px";
            //chequear colisiones
            if (avatar.collision(bcr.advtBCR, bcr.impBCR)) {
                audio_hit.play();
                if (avatar.life > 0) {
                    avatar.hurt(life, adventurer);
                    myID = requestAnimationFrame(loop);
                } else {
                    avatar.death(adventurer);
                    stop("lose");
                    audio_death.play();
                }
            } else if (avatar.collision(bcr.advtBCR, bcr.ppBCR)) {
                audio_collect.play();
                pp.style.background = "url('./img/puff.png')";
                setTimeout(() => {
                    pp.classList.remove("pp");
                    void pp.offsetWidth;
                    pp.classList.add("pp");
                    pp.style.background = "url('./img/pp.png')";
                }, 300);
                if (!colliding) {
                    previousDistance++;
                }
                colliding = true;
                myID = requestAnimationFrame(loop);
            } else {
                colliding = false;
                myID = requestAnimationFrame(loop);
            }
        }
    };
    //actualiza en pantalla la distancia recorrida
    function printDist(distance, pDistance, div) {
        let par1 = document.createElement("p"),
            par2 = document.createElement("p");
        let tNode1 = document.createTextNode("Scrolls: " + pDistance),
            tNode2 = document.createTextNode("Distance: " + Math.floor(distance / 10) + "mt");
        par1.appendChild(tNode1);
        par2.appendChild(tNode2);
        div.innerHTML = "";
        div.appendChild(par1);
        div.appendChild(par2);
    }
    //funcion de inicio de juego
    function go() {
        if (avatar.dead || win) {
            setTimeout(() => {
                win = false;
                void ip.offsetWidth;
                animationState("running");
                front.style.display = "none";
                st[0].style.display = "none";
                st[1].style.display = "none";
                rst[0].style.display = "none";
                rst[1].style.display = "none";
                wst[0].style.display = "none";
                wst[1].style.display = "none";
                avatar.dead = false;
                distCounter = 0;
                previousDistance = 0;
                avatar.start(adventurer, lifeBorder, life);
                ip.classList.remove("rb");
                pp.classList.remove("pp");
                void ip.offsetWidth;
                void pp.offsetWidth;
                ip.classList.add("rb");
                pp.classList.add("pp");
                inicio.style.display = "none";
                myID = requestAnimationFrame(loop);
            }, 250);
        }
    }
    //funcion de fin de juego
    function stop(state) {
        setTimeout(() => {
            animationState("paused");
            front.style.display = "inline";
            if (state == "lose") {
                rst[0].style.display = "block";
                rst[1].style.display = "block";
            } else if (state == "win") {
                win = true;
                wst[0].style.display = "block";
                wst[1].style.display = "block";
            }
            inicio.style.display = "inline";
            inicio.innerHTML = "Restart";
            if (inicio.classList.contains("btn-info") && win) {
                inicio.classList.replace("btn-info", "btn-success");
            } else {
                inicio.classList.replace("btn-success", "btn-info");
            }
        }, 1500);
    }
    //inicia o para animaciones
    function animationState(state) {
        p1.style.animationPlayState = state;
        p2.style.animationPlayState = state;
        p3.style.animationPlayState = state;
        p4.style.animationPlayState = state;
        playground.style.animationPlayState = state;
        p6.style.animationPlayState = state;
        adventurer.style.animationPlayState = state;
        ip.style.animationPlayState = state;
        pp.style.animationPlayState = state;
    }
    //deteccion de eventos de teclas
    inicio.addEventListener('click', e => go());
    document.addEventListener('keydown', e => joystick.keyListener(e));
    document.addEventListener('keyup', e => joystick.keyListener(e));
}