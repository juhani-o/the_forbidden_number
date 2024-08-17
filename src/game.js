import { init, Sprite, loadImage, GameLoop, initInput, onInput} from 'kontra';

// Alustetaan canvas ja syötteet
let { canvas, context } = init();
initInput();

// Enum pelitiloille
const GameState = {
  INIT: 'init',
  MENU: 'menu',
  RUNNING: 'running',
};

let gameState = GameState.INIT;
let svgImage;

// Ladataan SVG-kuva
loadImage('assets/intro_text.svg').then(function(image) {
  svgImage = image;
  gameState = GameState.MENU;
  console.log("Gamestate ", gameState);
  renderMenu();  // Piirretään SVG kuva
});

// Funktio, joka näyttää SVG-kuvan start-menuna
function renderMenu() {
  if (gameState === GameState.MENU && svgImage) {
    // Piirretään SVG kuva canvasille
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(svgImage, 0, 0, canvas.width, canvas.height);
  }
}

// Sprite pelihahmolle
let sprite = Sprite({
  x: 100,        // alkux ja y sijainti
  y: 80,
  color: 'red',  // väri
  width: 20,     // leveys
  height: 40,    // korkeus
  dx: 2          // liikkeen nopeus oikealle
});

// Pelisilmukka
let loop = GameLoop({
  update: function() {
    if (gameState === GameState.RUNNING) {
      sprite.update();

      // Kierrätetään hahmo canvasin yli
      if (sprite.x > canvas.width) {
        sprite.x = -sprite.width;
      }
    }
  },
  render: function() {
    if (gameState === GameState.RUNNING) {
      context.clearRect(0, 0, canvas.width, canvas.height);  // Tyhjennä edellinen ruutu
      sprite.render();
    } else if (gameState === GameState.MENU) {
      renderMenu();  // Näytetään start-menu
    }
  }
});

// Klikkauksen kuuntelija, joka käynnistää pelin
onInput('p', function() {
  if (gameState === GameState.MENU) {
    gameState = GameState.RUNNING;
    console.log("Game started");
  }
});

// Käynnistetään pelisilmukka
loop.start();

