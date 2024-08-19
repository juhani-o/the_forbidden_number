        import Huuhaa from './huuhaa.js';
        import introText from './assets/intro_text.svg';

        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        let runningStage = 0;

        let svgImage = new Image();
        // Check for mobile device 
        if (navigator.maxTouchPoints > 0) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.position = 'absolute';
            canvas.style.top = 0;
            canvas.style.left = 0;
        }

        // Ladataan SVG-tiedosto ja näytetään se canvasilla
        function loadSVG() {
            svgImage.src = introText;  // Muuta tämä oman SVG-tiedostosi URLiksi
            svgImage.onload = (data) => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(svgImage, 0, 0, canvas.width, canvas.height);
                runningStage = 1;
            };
        }

        // Piirrä satunnaisia neliöitä
        function drawRandomShapes() {
            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 50, 50);
        }

        // Klikattaessa canvasia aloita luuppi
        canvas.addEventListener('click', () => {
            if (runningStage == 1) {
                runningStage = 2;
                loop();
            }
        });

        // Piirtoluuppi
        function loop() {
            if (runningStage == 2) {
                drawRandomShapes();
                requestAnimationFrame(loop);  // Jatketaan luuppia
            }
        }

        // Käynnistetään SVG:n lataus ohjelman alussa
        window.onload = loadSVG;

