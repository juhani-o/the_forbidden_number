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

// Use CONST for readability
const STAGES = {
  INTRO: 0,
  STAGE_1: 1,
  STAGE_2: 2,
  GAME_OVER: 3,
};

let runningStage = STAGES.INTRO;

let blur = 0;
const numberBlockSize = 100;

// These are used for animated loop
let lastRenderTime = 0;
const fps = 60;
const frameDuration = 1000 / fps;

// Helpers for screen geometry
const cw = canvas.width;
const ch = canvas.height;

const bw = cw / numberBlockSize;
const bh = ch / numberBlockSize;

// Misc. variables.
let gameTable;
let timerBar = 0;
let render = true;
let lastClick = { x: -1, y: -1 };
let clickCount = 0;
const timerFactor = 0.4;

let level = 0;

let highScore = 0;

//  Function for more static content. Intro, start and game over screens.

function processGameStage() {
  switch (runningStage) {
    case STAGES.INTRO:
      drawSVG(ctx, intro, {});
      break;
    case STAGES.STAGE_1:
      playSong();
      clearCanvas(ctx);
      drawSVG(ctx, stage1label, {});
      break;
    case STAGES.STAGE_2:
      requestAnimationFrame(animLoop);
      break;
    case STAGES.GAME_OVER:
      clearCanvas(ctx);
      if (clickCount > highScore) {
        highScore = clickCount;
      }
      drawSVG(ctx, gameOver, {
        number: String(clickCount),
        highScore: String(highScore),
      });
      break;
    default:
      break;
  }
}

// Draw game stage, do not draw number when it is clicked.
function drawStage() {
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

// Some game logic in here.
function processGameLogic(lastClick) {
  let current = gameTable[lastClick.x][lastClick.y];
  if (!current) return;

  // If clicked "the forbidden number" add more time
  // to timer bar
  if (current["num1"] == 13) {
    timerBar = timerBar + 100;

    // If times passed max width -> game over
    if (timerBar > cw) {
      runningStage = STAGES.GAME_OVER;
      processGameStage();
    }
  } else {
    clickCount = clickCount + 1;
    current.clicked = true;

    // It was not 13, so let's mark clicked and
    // count how many numbers there is left. If all gone,
    // jump to next level.

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

// Initialization of game. Game table, set timeBar to zero etc.

function initGameVariables() {
  gameTable = getStage1Table(bw, bh - 1, level); // Remove last row because progess bar
  clearCanvas(ctx);
  timerBar = 0;
  level = 0;
  clickCount = 0;
  render = true;
}

// Handler function for mouse click

function handleClick(event) {
  if (runningStage === STAGES.INTRO) {
    runningStage = STAGES.STAGE_1;
    processGameStage();
  } else if (runningStage == STAGES.STAGE_1) {
    runningStage = STAGES.STAGE_2;
    processGameStage();
  } else if (runningStage == STAGES.STAGE_2) {
    // This is actual game stage, mouse location sent to
    // processing function

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

// This is called after window.onload, so we can

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
      drawStage();
    }

    // Timeout -> game over!
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
