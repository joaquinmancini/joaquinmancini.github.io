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
    let avatar, imp, joystick, bcr;
    let myID, distCounter = 0,
        prevDist = 0,
        lAux;
    //obtencion de elementos
    let playground = document.querySelector('.HillsLayer05'),
        adventurer = document.querySelector('.avatar'),
        ip = document.querySelector('.rb'),
        life = document.querySelector('.lifeMeter2'),
        dist = document.querySelector('.distance');

    bcr = new Bcr();
    //obtencion de propiedades de elementos
    bcr.getBCR(playground, adventurer, ip, life);
    lAux = bcr.lfBCR.width;
    //definicion de altura de 'piso'
    let groundHeight = bcr.plgrBCR.height - bcr.advtBCR.height - (bcr.advtBCR.top - bcr.plgrBCR.top);
    //definicion de objetos
    avatar = new Avatar(bcr.advtBCR.width, bcr.advtBCR.height, bcr.advtBCR.x, bcr.advtBCR.y, bcr.lfBCR.width);
    imp = new Monster(bcr.impBCR.width, bcr.impBCR.height, bcr.impBCR.x, bcr.impBCR.y);
    joystick = new Joystick();


    //funcion loop que toma las modificaciones del juego hasta que ocurra condicion
    function loop() {
        //obtener propiedades de elementos
        bcr.getBCR(playground, adventurer, ip, life);
        distCounter++;
        printDist(distCounter, prevDist, dist);

        if (joystick.up && !avatar.jump) {
            avatar.velY -= 17;
            adventurer.style.background = "url('./img/jump.png')";
            adventurer.style.animation = "anJumpA 1.25s steps(6)";
            avatar.jump = true;
        }
        avatar.velY += 0.45;
        avatar.y += avatar.velY;
        avatar.velY *= 0.95;
        //controlar que no pase del piso
        avatar.checkFloor(bcr.plgrBCR, groundHeight, adventurer);
        adventurer.style.top = avatar.y + "px";
        //chequear colisiones
        if (avatar.collision(bcr.advtBCR, bcr.impBCR)) {
            if (avatar.lifeCounter > 0) {
                avatar.hurt(life);
                myID = requestAnimationFrame(loop);
            } else {
                avatar.death(adventurer);
                ip.style.animationIterationCount = "1";
                if (distCounter > prevDist) {
                    prevDist = distCounter;
                }
                cancelAnimationFrame(myID);
            }
        } else {
            myID = requestAnimationFrame(loop);
        }
    };
    //actualiza distancia recorrida
    function printDist(distance, previousDistance, div) {
        let par1 = document.createElement("p"),
            par2 = document.createElement("p");
        let tNode1 = document.createTextNode("Best dist.: " + previousDistance + " meters"),
            tNode2 = document.createTextNode("Current dist.: " + Math.floor(distance / 10) + " meters");
        par1.appendChild(tNode1);
        par2.appendChild(tNode2);
        div.innerHTML = "";
        div.appendChild(par1);
        div.appendChild(par2);
    }
    //deteccion de eventos de teclas
    let inicio = document.querySelector('.inicio');
    inicio.addEventListener('click', function () {
        distCounter = 0;
        console.log("haa");
        life.style.width = this.lAux + "px";
        adventurer.animation = "anRunA 1s steps(8) infinite";
        myID = requestAnimationFrame(loop);
    })
    document.addEventListener('keydown', e => joystick.keyListener(e));
    document.addEventListener('keyup', e => joystick.keyListener(e));
    //llamado a funcion de animacion para que arranque el juego 
}