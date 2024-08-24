import svgContent from './assets/numberandtext.svg';
function modifySVGText(svgString, newText) {
    const parser = new DOMParser();
    const svgDocument = parser.parseFromString(svgString, 'image/svg+xml');

    const textElement = svgDocument.getElementById("tspan1594")
    if (textElement) {
        textElement.textContent = newText; // Vaihda teksti
    }

    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgDocument);
}

function drawSVGToCanvas(svgText) {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const svgData = 'data:image/svg+xml;base64,' + btoa(svgText);
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width / 10 , canvas.height / 10); // Piirretään kuva canvakseen
    };
    img.src = svgData;

}

export const processSVG = () => {
    const modifiedSVG = modifySVGText(svgContent, "13"); // Muokataan SVG
    drawSVGToCanvas(modifiedSVG); // Piirretään SVG canvakseen
};

