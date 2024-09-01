import intro from "./assets/intro_text.svg";
import click from "./assets/click.svg";
import numberAndText from "./assets/numberandtext.svg";

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
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    canvas.webkitRequestFullscreen();
  }
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
      playSong();
      drawSVG(intro, {});
      break;
    case 2:
      requestAnimationFrame(loop);
      break;
    default:
      break;
  }
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
    // drawRandomShapes();
    drawSVG(numberAndText, {x: 100, y: 100, text: "12"});
  } 
  requestAnimationFrame(loop);
}

window.onload = startGame;
