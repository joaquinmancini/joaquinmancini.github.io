//Se llena la matriz con aleatorios
function llenarMatrix(mat, M) {
    for (let i = 0; i < M; i++) {
        mat[i] = [];
        for (let j = 0; j < M; j++) {
            mat[i][j] = Math.floor(Math.random() * (Math.pow(M, 2)));
        }
    }
}
//Obtiene el valor maximo en toda la matriz
function getMax(mat, M) {
    let max = 0;
    mat.forEach(arr => {
        arr.forEach(cam => {
            if (cam > max) {
                max = cam;
            }
        });
    });
    console.log(max);
}
//Obtiene el maximo entre las filas pares y el minimo entre las filas impares            
function maxEvenMinOdd(mat, M) {
    let maxEven = 0;
    let minOdd = 0;
    for (let i = 0; i < M; i++) {
        if (i % 2) {
            //impares, por index=N-1
            for (let j = 0; j < M; j++) {
                if (j == 0) {
                    minOdd = mat[i][j];
                } else if (mat[i][j] < minOdd) {
                    minOdd = mat[i][j];
                }
            }
        } else {
            for (let j = 0; j < M; j++) {
                if (mat[i][j] > maxEven) {
                    maxEven = mat[i][j];
                }
            }
        }

    }
    console.log("MaxPar: " + maxEven + "\nMinImpar: " + minOdd);
}
//Guarda promedio de filas en un arreglo
function getAvg(arraux, mat, M) {
    for (let i = 0; i < M; i++) {
        let sum = 0;
        for (let j = 0; j < M; j++) {
            sum += mat[i][j];
        }
        arraux[i] = sum / M;
    }
}