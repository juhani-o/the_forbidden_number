import intro from "./assets/intro_text.svg";
import click from "./assets/click.svg";
import numberAndText from "./assets/numberandtext.svg";
import stage1label from "./assets/stage_1.svg";

import { drawSVG, clearCanvas } from "./svg.js";
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

function staticLoop() {
  switch (runningStage) {
    case 0:
      drawSVG(intro, { x: 0, y: 100, w: canvas.width, h: 400 });
      break;
    case 1:
      clearCanvas();
      drawSVG(stage1label, { x: 50, y: 100, w: canvas.width - 100, h: 400 });
      break;
    case 3:
      clearCanvas();
      for (var j = 0; j < canvas.height; j = j + 60) {
        for (var i = 0; i < canvas.width - 60; i = i + 60) {
          var n = Math.floor(Math.random() * 20);
          var numText = n > 9 ? n : " " + n;
          drawSVG(numberAndText, {
            x: i,
            y: j,
            w: canvas.width / 10,
            h: canvas.height / 10,
            blur: 0,
            text: numText,
          });
        }
      }
      // requestAnimationFrame(loop);
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
    drawSVG(numberAndText, { x: 100, y: 100, w: 100, h: 100, text: "12" });
  }
  requestAnimationFrame(loop);
}

window.onload = startGame;
