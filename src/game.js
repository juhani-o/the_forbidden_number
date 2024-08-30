import intro from "./assets/intro_text.svg";
import click from "./assets/click.svg";
import { drawSVG } from "./svg.js";
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

function staticLoop() {
  switch (runningStage) {
    case 0:
      drawSVG(click, {});
      break;
    case 1:
      drawSVG(intro, {});
      playSong();
      break;
    case 2:
      requestAnimationFrame(loop);
    default:
      break;
  }
}

function introScene() {
  drawSVG(click, { x: 0, y: 0 });
}

function startGame() {
  canvas.addEventListener("click", () => {
    runningStage = runningStage + 1;
    staticLoop();
  });
  staticLoop();
}

function loop(timestamp) {
  const timeSinceLastRender = timestamp - lastRenderTime;
  if (timeSinceLastRender >= frameDuration) {
    lastRenderTime = timestamp;
    drawRandomShapes();
  }
  requestAnimationFrame(loop);
}

window.onload = startGame;
