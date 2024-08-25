        import { processSVG } from './svg.js';
        import { Note, Sequence } from './TinyMusic.min.js';
        import { playSong } from './music.js';

        import introText from './assets/intro_text.svg';
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        let runningStage = 0;
        let blur = 0;


        let lastRenderTime = 0;
        const fps = 60;
        const frameDuration = 1000 / fps;

        let svgImage = new Image();
        // Check for mobile device 
        if (navigator.maxTouchPoints > 0) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.position = 'absolute';
            canvas.style.top = 0;
            canvas.style.left = 0;
        }

        // Piirrä satunnaisia neliöitä
        function drawRandomShapes() {
            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 50, 50);
        }

        function startGame() {
            runningStage = 1;
        }

        // Klikattaessa canvasia aloita luuppi
        canvas.addEventListener('click', () => {
            if (runningStage == 1) {
                playSong();
                runningStage = 2;
            }
        });

        // Piirtoluuppi
        function loop(timestamp) {
          const timeSinceLastRender = timestamp - lastRenderTime;
          if (timeSinceLastRender >= frameDuration) {
            lastRenderTime = timestamp;
            if (runningStage == 1) {
                processSVG(blur);
                blur = blur + 0.01;
            }
            if (runningStage == 2) {
                drawRandomShapes();
            }
          }
          requestAnimationFrame(loop);  // Jatketaan luuppia
        }
        requestAnimationFrame(loop);

        // Käynnistetään SVG:n lataus ohjelman alussa
        window.onload = startGame;

