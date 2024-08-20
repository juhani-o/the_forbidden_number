        function loadSVG(url) {
            return fetch(url)
                .then(response => response.text()) // Haetaan SVG-tiedosto tekstimuodossa
                .then(svgText => new DOMParser().parseFromString(svgText, 'image/svg+xml')) // Muutetaan tekstimuotoinen SVG XML DOMiksi
        }

        function modifySVG(svgDocument) {
            const path = svgDocument.querySelectorAll("tspan")
            path.forEach(item => console.log("item ", item.textContent = "moi"))

            //if (path) {
            //    path[0].setAttribute('textContent', 'Kukkaruukku'); // Muutetaan täyttöväri punaiseksi
            //}
            return new XMLSerializer().serializeToString(svgDocument); // Muutetaan takaisin SVG-muotoon
        }

        function drawSVGToCanvas(svgText) {
            const canvas = document.getElementById('game');
            const ctx = canvas.getContext('2d');

            const img = new Image();
            const svgData = 'data:image/svg+xml;base64,' + btoa(svgText);

            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Tyhjennetään canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Piirretään kuva canvakseenZZZ
            };

            img.src = svgData;
        }
        
        export const processSVG = (filename) => {
          loadSVG(filename).then(svgDocument => {
            const modifiedSVG = modifySVG(svgDocument); // Muokataan SVG
            drawSVGToCanvas(modifiedSVG); // Piirretään canvakseen
          });
        }
