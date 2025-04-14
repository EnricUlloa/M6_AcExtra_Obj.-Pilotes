// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuisar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/
import Pilota from './pilota.js';
  //Pilota: nom que s'ha utilitzat en aquest arxiu per referir-nos allo que s'ha exportat
  //'.pilota.js': la ubicacio de l'arxiu d'on ve la classe


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// funció per generar un número aleatori entre dues xifres

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// funció per generar un color aleatori

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

let Pilota1 = new Pilota(50, 100, 4, 4, "blue", 10);
    Pilota1.dibuxa(ctx);

// Creem un array de pilotes
let pilotes = [];

// funció loop, aixo anima a les pilotes
function loop() {
  //Aixo pinta el canvas amb el color que hem indicat
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Si no hi ha pilotes, aixo crea 25 pilotes amb una mida aleatoria, posicio aleatoria, velocitat aleatoria y amb un color aleatori
  if (pilotes.length < 25) {
    while (pilotes.length < 25) {
      let mida = random(10, 20);
      let x = random(mida, canvas.width - mida);
      let y = random(mida, canvas.height - mida);
      let velX = random(-5, 5);
      let velY = random(-5, 5);
      let color = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

      pilotes.push(new Pilota(x, y, velX, velY, color, mida));
    }
  }

  //Aixo dibuixa i mou cada pilota
    //dibuixa: es dibuixa amb el seu color i mida
    //mou: es mou i rebota si toca les vores
  for (let pilota of pilotes) {
    pilota.dibuxa(ctx);
    pilota.mou(canvas.width, canvas.height);
  }

  for (let i = 0; i < pilotes.length; i++) {
    for (let j = i + 1; j < pilotes.length; j++) {
      const dx = pilotes[i].x - pilotes[j].x;
      const dy = pilotes[i].y - pilotes[j].y;
      const distancia = Math.sqrt(dx*dx + dy*dy);

      if (distancia < pilotes[i].mida + pilotes[j].mida) {
        //La detecció de col·lisions entre pilotes
        pilotes[i].velX = -pilotes[i].velX;
        pilotes[i].velY = -pilotes[i].velY;
        pilotes[j].velX = -pilotes[j].velX;
        pilotes[j].velY = -pilotes[j].velY;
      }
    }
  }

  //Aixo torna a trucar a loop()
  requestAnimationFrame(loop);
}

loop();