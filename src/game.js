import intro from "./assets/intro_text.svg";
import click from "./assets/click.svg";
import numberAndText from "./assets/numberandtext.svg";
import stage1label from "./assets/stage_1.svg";

import { drawSVG, clearCanvas } from "./svg.js";
import { Note, Sequence } from "./TinyMusic.min.js";
import { playSong } from "./music.js";
import { getStage1Table } from "./utils.js";
import { drawTimerBar } from "./graphics.js";

import introText from "./assets/intro_text.svg";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let runningStage = 0;
let blur = 0;
const numberBlockSize = 100;

let lastRenderTime = 0;
const fps = 60;
const frameDuration = 1000 / fps;

const cw = canvas.width;
const ch = canvas.height;

const bw = cw / numberBlockSize;
const bh = ch / numberBlockSize;

let gameTable; // = getStage1Table(bw, bh - 1)c;

var timerBar = 0;

let render = true;
let lastClick = { x: -1, y: -1 };

function processGameStage() {
  switch (runningStage) {
    case 0:
      drawSVG(ctx, intro, { x: 0, y: 100, w: cw, h: 400 });
      break;
    case 1:
      clearCanvas(ctx);
      drawSVG(ctx, stage1label, { x: 50, y: 100, w: cw - 100, h: 400 });
      break;
    case 2:
      clearCanvas(ctx);
      requestAnimationFrame(animLoop);
      break;
    default:
      break;
  }
}

function renderStage1() {
  for (var j = 0; j < bh - 1; j = j + 1) {
    for (var i = 0; i < bw; i = i + 1) {
      const cell = gameTable[i][j];
      // Let's not render clicked numbers
      if (cell.clicked == true) continue;
      var numText = cell["num1"] > 9 ? cell["num1"] : " " + cell["num1"];
      drawSVG(ctx, numberAndText, {
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

function processGameLogic(lastClick) {
  let current = gameTable[lastClick.x][lastClick.y];
  if (current["num1"] == 13) {
    timerBar = timerBar + 100;
  } else {
    current.clicked = true;
    const result = gameTable.flatMap((row) => row);
    const numberAmount = gameTable
      .flatMap((row) => row)
      .filter((number) => number.clicked !== true)
      .filter((number) => number.num1 !== 13);
    console.log("Numerot ", numberAmount);
  }
  render = true;
}

function handleClick(event) {
  if (runningStage < 2) {
    runningStage = runningStage + 1;
    processGameStage();
  } else if (runningStage == 2) {
    const rect = canvas.getBoundingClientRect();
    timerBar = timerBar - 1;
    lastClick = {
      x: Math.floor((event.clientX - rect.left) / numberBlockSize),
      y: Math.floor((event.clientY - rect.top) / numberBlockSize),
    };
    processGameLogic(lastClick);
  }
}

function startGame() {
  gameTable = getStage1Table(bw, bh - 1); // Remove last row because progess bar
  canvas.addEventListener("click", handleClick, () => handleClick(event));
  processGameStage();
}

function animLoop(timestamp) {
  const timeSinceLastRender = timestamp - lastRenderTime;
  if (timeSinceLastRender >= frameDuration) {
    lastRenderTime = timestamp;
    if (render) {
      clearCanvas(ctx);
      renderStage1();
    }
    drawTimerBar(ctx, timerBar, ch - numberBlockSize, cw, ch);
    timerBar = timerBar + 0.1;
    render = false;
  }
  requestAnimationFrame(animLoop);
}

window.onload = startGame;
