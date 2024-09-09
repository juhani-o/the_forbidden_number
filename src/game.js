import intro from "./assets/intro_text.svg";
import click from "./assets/click.svg";
import numberAndText from "./assets/numberandtext.svg";
import stage1label from "./assets/stage_1.svg";

import { drawSVG, clearCanvas } from "./svg.js";
import { Note, Sequence } from "./TinyMusic.min.js";
import { playSong } from "./music.js";
import { getStage1Table } from "./utils.js";

import introText from "./assets/intro_text.svg";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let runningStage = 0;
let blur = 0;
const numberBlockSize = 66.66666;

let lastRenderTime = 0;
const fps = 60;
const frameDuration = 1000 / fps;

const cw = canvas.width;
const ch = canvas.height;

const bw = cw / numberBlockSize;
const bh = ch / numberBlockSize;

const gametable = getStage1Table(bw, bh);

let render = true;

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
      drawSVG(intro, { x: 0, y: 100, w: cw, h: 400 });
      break;
    case 1:
      clearCanvas();
      drawSVG(stage1label, { x: 50, y: 100, w: cw - 100, h: 400 });
      break;
    case 2:
      clearCanvas();
      requestAnimationFrame(animLoop);
      break;
    default:
      break;
  }
}

function renderStage1() {
  // clearCanvas();
  for (var j = 0; j < bh - 2; j = j + 1) {
    for (var i = 0; i < bw; i = i + 1) {
      const cell = gametable[i][j];
      var numText = cell["num1"] > 9 ? cell["num1"] : " " + cell["num1"];
      drawSVG(numberAndText, {
        x: i * numberBlockSize,
        y: j * numberBlockSize,
        w: numberBlockSize,
        h: numberBlockSize,
        blur: cell["blur"],
        text: numText,
      });
    }
  }
}

function handleStaticContentActions(event) {
  console.log("click shit ", event.clientX, event.clientY);
}

function startGame() {
  function handleClick(event) {
    if (runningStage < 2) {
      runningStage = runningStage + 1;
      staticLoop(event);
    }
  }

  canvas.addEventListener("click", handleClick);
  staticLoop();
}

function animLoop(timestamp) {
  const timeSinceLastRender = timestamp - lastRenderTime;
  if (timeSinceLastRender >= frameDuration) {
    lastRenderTime = timestamp;
    if (render) renderStage1();
    render = false;
  }
  requestAnimationFrame(animLoop);
}

window.onload = startGame;
