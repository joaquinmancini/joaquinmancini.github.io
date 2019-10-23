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
        health = 100,
        speed = 4;
    //obtencion de elementos
    let playground = document.querySelector('.HillsLayer05'),
        adventurer = document.querySelector('.avatar'),
        ip = document.querySelector('.rb'),
        lifeBorder = document.querySelector('.lifeMeter'),
        life = document.querySelector('.lifeMeter2'),
        dist = document.querySelector('.distance'),
        inicio = document.querySelector('.inicio'),
        front = document.querySelector('.FrontGround');
    bcr = new Bcr();

    //obtencion de propiedades de elementos
    bcr.getBCR(playground, adventurer, ip, life);
    //definicion de altura de 'piso'
    let groundHeight = bcr.plgrBCR.height - bcr.advtBCR.height - (bcr.advtBCR.top - bcr.plgrBCR.top);
    //definicion de objetos
    avatar = new Avatar(bcr.advtBCR.width, bcr.advtBCR.height, bcr.advtBCR.x, bcr.advtBCR.y, health);
    joystick = new Joystick();
    //funcion loop que toma las modificaciones del juego hasta que ocurra condicion
    function loop() {
        if (!avatar.dead) {
            //obtener propiedades de elementos
            bcr.getBCR(playground, adventurer, ip, life);
            //aumentar distancia e imprimirla
            distCounter++;
            printDist(distCounter, previousDistance, dist);
            //salto personaje
            avatar.jumping(joystick, adventurer);
            //controlar que no pase del piso
            avatar.checkFloor(bcr.plgrBCR, groundHeight, adventurer);
            adventurer.style.top = avatar.y + "px";
            //chequear colisiones

            if (avatar.collision(bcr.advtBCR, bcr.impBCR)) {
                if (avatar.life > 0) {
                    avatar.hurt(life);
                    //console.log(avatar.life);
                    myID = requestAnimationFrame(loop);
                } else {
                    avatar.death(adventurer);
                    ip.style.animationIterationCount = "1";
                    if (distCounter > previousDistance) {
                        previousDistance = distCounter;
                    }
                    inicio.style.display = "inline";
                    cancelAnimationFrame(myID);
                }
            } else {
                if (bcr.impBCR.left < 145) {
                    speed *= 0.99;
                    ip.style.animation = "anRB 0.8s steps(8) infinite, anR 4s steps(400) infinite";
                }
                myID = requestAnimationFrame(loop);
            }
        }
    };
    //actualiza en pantalla la distancia recorrida
    function printDist(distance, pDistance, div) {
        let par1 = document.createElement("p"),
            par2 = document.createElement("p");
        let tNode1 = document.createTextNode("Best dist.: " + Math.floor(pDistance / 10) + " meters"),
            tNode2 = document.createTextNode("Current dist.: " + Math.floor(distance / 10) + " meters");
        par1.appendChild(tNode1);
        par2.appendChild(tNode2);
        div.innerHTML = "";
        div.appendChild(par1);
        div.appendChild(par2);
    }
    //funcion de inicio de juego
    function go() {
        if (avatar.dead) {
            front.style.display = "none";
            avatar.dead = false;
            distCounter = 0;
            avatar.start(adventurer, lifeBorder, life);
            ip.style.animation = "anRB 0.8s steps(8) infinite, anR 4s steps(400) infinite";
            inicio.style.display = "none";
            myID = requestAnimationFrame(loop);
        }
    }
    //deteccion de eventos de teclas
    inicio.addEventListener('click', e => go());
    document.addEventListener('keydown', e => joystick.keyListener(e));
    document.addEventListener('keyup', e => joystick.keyListener(e));
}