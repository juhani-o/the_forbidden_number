import intro from "./assets/intro_text.svg";
import click from "./assets/click.svg";
import numberAndText from "./assets/numberandtext.svg";
import stage1label from "./assets/stage_1.svg";
import gameOver from "./assets/game_over.svg";

import { drawSVG, clearCanvas } from "./svg.js";
import { Note, Sequence } from "./TinyMusic.min.js";
import { playSong } from "./music.js";
import { getStage1Table } from "./utils.js";
import { drawTimerBar } from "./graphics.js";

import introText from "./assets/intro_text.svg";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const STAGES = {
  INTRO: 0,
  STAGE_1: 1,
  STAGE_2: 2,
  GAME_OVER: 3,
};
let runningStage = STAGES.INTRO;

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
let clickCount = 0;
const timerFactor = 0.4;

let level = 0;

function processGameStage() {
  switch (runningStage) {
    case STAGES.INTRO:
      drawSVG(ctx, intro, {});
      break;
    case STAGES.STAGE_1:
      // playSong();
      clearCanvas(ctx);
      drawSVG(ctx, stage1label, {});
      break;
    case STAGES.STAGE_2:
      // clearCanvas(ctx);
      requestAnimationFrame(animLoop);
      break;
    case STAGES.GAME_OVER:
      clearCanvas(ctx);
      drawSVG(ctx, gameOver, {
        number: String(clickCount),
      });
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
  if (!current) return;
  if (current["num1"] == 13) {
    timerBar = timerBar + 100;
    if (timerBar > cw) {
      runningStage = STAGES.GAME_OVER;
      processGameStage();
    }
  } else {
    clickCount = clickCount + 1;
    current.clicked = true;
    const result = gameTable.flatMap((row) => row);
    const numberAmount = gameTable
      .flatMap((row) => row)
      .filter((number) => number.clicked !== true)
      .filter((number) => number.num1 !== 13);
    if (numberAmount.length == 0) {
      level = level + 1;
      timerBar = 0;
      gameTable = getStage1Table(bw, bh - 1, level);
    }
    render = true;
  }
}

function initGameVariables() {
  gameTable = getStage1Table(bw, bh - 1, level); // Remove last row because progess bar
  clearCanvas(ctx);
  timerBar = 0;
  level = 0;
  clickCount = 0;
  render = true;
}

function handleClick(event) {
  if (runningStage === STAGES.INTRO) {
    runningStage = STAGES.STAGE_1;
    processGameStage();
  } else if (runningStage == STAGES.STAGE_1) {
    runningStage = STAGES.STAGE_2;
    processGameStage();
  } else if (runningStage == STAGES.STAGE_2) {
    const rect = canvas.getBoundingClientRect();
    timerBar = timerBar - 1;
    lastClick = {
      x: Math.floor((event.clientX - rect.left) / numberBlockSize),
      y: Math.floor((event.clientY - rect.top) / numberBlockSize),
    };
    processGameLogic(lastClick);
  } else if (runningStage == STAGES.GAME_OVER) {
    initGameVariables();
    runningStage = 2;
    processGameStage();
  }
}

function startGame() {
  initGameVariables();
  canvas.addEventListener("click", handleClick);
  processGameStage();
}

function animLoop(timestamp) {
  if (runningStage !== STAGES.STAGE_2) return;
  const timeSinceLastRender = timestamp - lastRenderTime;
  if (timeSinceLastRender >= frameDuration) {
    lastRenderTime = timestamp;
    if (render) {
      clearCanvas(ctx);
      renderStage1();
    }
    if (timerBar > cw) {
      runningStage = STAGES.GAME_OVER;
      processGameStage();
    } else {
      drawTimerBar(ctx, timerBar, ch - numberBlockSize, cw, ch);
      timerBar = timerBar + (level / 3 + 1) * timerFactor;
    }
    render = false;
  }
  requestAnimationFrame(animLoop);
}

window.onload = startGame;
