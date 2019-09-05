    "use strict";
    document.addEventListener("DOMContentLoaded", function () {
        let link1 = document.querySelector(".js-cargar1");
        let link2 = document.querySelector(".js-cargar2");
        let link3 = document.querySelector(".js-cargar3");
        let link4 = document.querySelector(".js-cargar4");
        let link5 = document.querySelector(".js-cargar5");
        let link6 = document.querySelector(".js-cargar6");
        link1.addEventListener("click", function (e) {
            e.preventDefault();
            clearBox(".workspace");
            const M = 10;
            let mat = [];
            let arraux = [];
            llenarMatrix(mat, M);
            console.log(mat);
            console.log("PUNTO A");
            getMax(mat, M);
            console.log("PUNTO B");
            maxEvenMinOdd(mat, M);
            console.log("PUNTO C");
            getAvg(arraux, mat, M);
            console.log(arraux);
        })
        link2.addEventListener("click", function (e) {
            e.preventDefault();
            let canv = getCanvas();
            let ctx = canv.getContext("2d");
            let width = canv.width;
            let heigth = 200;
            ctx.fillStyle = '#3BE880';
            ctx.fillRect(0, 0, width, heigth);
        })
        link3.addEventListener("click", function (e) {
            e.preventDefault();
            let canv = getCanvas();
            let ctx = canv.getContext('2d');
            let width = canv.width,
                heigth = 200;
            let imageData = ctx.createImageData(width, heigth);
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < heigth; y++) {
                    setPixel(imageData, x, y, 102, 204, 0, 255);
                }
                ctx.putImageData(imageData, 0, 0);
            }
        })
        link4.addEventListener("click", function (e) {
            e.preventDefault();
            let canv = getCanvas();
            let ctx = canv.getContext("2d");
            let width = canv.width,
                heigth = 200,
                r = 0,
                g = 0,
                b = 0,
                a = 255;
            let imageData = ctx.createImageData(width, heigth);
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < heigth; y++) {
                    r = (y / heigth) * 255;
                    g = (y / heigth) * 255;
                    b = (y / heigth) * 255;
                    setPixel(imageData, x, y, r, g, b, a);
                }
            }
            ctx.putImageData(imageData, 0, 0);
        })
        link5.addEventListener("click", function (e) {
            e.preventDefault();
            let canv = getCanvas();
            let ctx = canv.getContext("2d");
            let width = canv.width,
                heigth = 200,
                r = 0,
                g = 0,
                b = 0,
                a = 255;
            let imageData = ctx.createImageData(width, heigth);
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < heigth; y++) {
                    if (x < width / 2) {
                        r = (x / (width / 2)) * 255;
                        g = (x / (width / 2)) * 255;
                        b = (x / (width / 2)) * 0;
                    } else {
                        r = 255;
                        g = (1 - ((x - width / 2) / (width / 2))) * 255;
                        b = 0;
                    }

                    setPixel(imageData, x, y, r, g, b, a);
                }
            }
            ctx.putImageData(imageData, 0, 0);
        })
        link6.addEventListener("click", function (e) {
            e.preventDefault();
            let canv = getCanvas();
            let ctx = canv.getContext("2d");
            let imageData;
            let image1 = new Image();
            image1.src = "https://miro.medium.com/max/1200/1*hv0Rr5-DKpN_bDomhlTj7Q.jpeg";
            image1.crossOrigin = 'Anonymous';
            image1.onload = function () {
                canv.width = image1.width;
                canv.height = image1.height;
                ctx.drawImage(image1, 0, 0);
                imageData = ctx.getImageData(0, 0, this.width, this.height);
                ctx.putImageData(imageData, 0, 0);
                let cont = document.createElement("div");
                cont.setAttribute('class', 'botonera');
                let greyBut = document.createElement("button");
                greyBut.setAttribute('class', 'btn btn-dark gradBut');
                greyBut.setAttribute('type', 'button');
                greyBut.innerHTML = "Aplicar Grises";
                cont.appendChild(greyBut);
                canv.parentNode.insertBefore(cont, canv.nextSibling);
                greyBut.addEventListener("click", function () {
                    setGrey(imageData, ctx);
                })
            }
        })

        function setGrey(imageData, ctx) {
            for (let x = 0; x < imageData.width; x++) {
                for (let y = 0; y < imageData.width; y++) {
                    let red = getRed(imageData, x, y);
                    let green = getGreen(imageData, x, y);
                    let blue = getBlue(imageData, x, y);
                    let avg = (red + green + blue) / 3;
                    let index = (x + y * imageData.width) * 4;
                    imageData.data[index + 0] = avg;
                    imageData.data[index + 1] = avg;
                    imageData.data[index + 2] = avg;
                    imageData.data[index + 3] = 255;
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function setPixel(imageData, x, y, r, g, b, a) {
            let index = (x + y * imageData.width) * 4;
            imageData.data[index + 0] = r;
            imageData.data[index + 1] = g;
            imageData.data[index + 2] = b;
            imageData.data[index + 3] = a;
        }

        function getCanvas() {
            clearBox(".workspace");
            createCanvas(".workspace");
            let canv = document.querySelector(".canvas");
            return canv;
        }
        //Borra contenido de un contenedor y limpia consola
        function clearBox(elementID) {
            document.querySelector(elementID).innerHTML = "";
            console.clear();
        }

        function createCanvas(elementID) {
            let canv = document.createElement('canvas');
            canv.setAttribute('class', 'offset-4 col-4 canvas');
            document.querySelector(elementID).appendChild(canv);
        }

        function getRed(imageData, x, y) {
            let index = (x + y * imageData.width) * 4;
            return imageData.data[index + 0];
        }

        function getGreen(imageData, x, y) {
            let index = (x + y * imageData.width) * 4;
            return imageData.data[index + 1];
        }

        function getBlue(imageData, x, y) {
            let index = (x + y * imageData.width) * 4;
            return imageData.data[index + 2];
        }
    })