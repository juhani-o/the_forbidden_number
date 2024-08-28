import intro from "./assets/intro_text.svg";
import click from "./assets/click.svg";
import { processSVG } from "./svg.js";
import { Note, Sequence } from "./TinyMusic.min.js";
import { playSong } from "./music.js";

import introText from "./assets/intro_text.svg";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let runningStage = 0;
let blur = 0;

let lastRenderTime = 0;
const fps = 60;
const frameDuration = 1000 / fps;

// Check for mobile device
if (navigator.maxTouchPoints > 0) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
}

// Piirrä satunnaisia neliöitä
function drawRandomShapes() {
  ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
  ctx.fillRect(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    50,
    50,
  );
}

function startGame() {
  canvas.addEventListener("click", () => {
    runningStage = runningStage + 1;
  });
}

// Piirtoluuppi
function loop(timestamp) {
  const timeSinceLastRender = timestamp - lastRenderTime;
  if (timeSinceLastRender >= frameDuration) {
    lastRenderTime = timestamp;
    switch (runningStage) {
      case 0:
        processSVG(click);
        break;
      case 1:
        playSong();
        processSVG(intro);
        break;
      case 2:
        drawRandomShapes();
      default:
        break;
    }
  }
  requestAnimationFrame(loop); // Jatketaan luuppia
}
requestAnimationFrame(loop);

// Käynnistetään SVG:n lataus ohjelman alussa
window.onload = startGame;
