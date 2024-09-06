function modifySVGText(svgString, newText) {
  const parser = new DOMParser();
  const svgDocument = parser.parseFromString(svgString, "image/svg+xml");

  const textElement = svgDocument.getElementById("tspan1594");
  if (textElement) {
    textElement.textContent = newText; // Vaihda teksti
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgDocument);
}

function drawSVGToCanvas(svg, data) {
  const { x, y, w, h, blur } = data;
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  if (data.blur) {
    ctx.filter = "blur(" + data.blur + "px)";
  }
  const img = new Image();
  const svgData = "data:image/svg+xml;base64," + btoa(svg);
  img.onload = function () {
    ctx.drawImage(img, x, y, w, h); // Piirretään kuva canvaokseen
    ctx.filter = "none";
  };
  img.src = svgData;
}

export function clearCanvas() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawSVG(svgContent, data) {
  const modifiedSVG = modifySVGText(svgContent, data.text); // Muokataan SVG
  drawSVGToCanvas(modifiedSVG, data); // Piirretään SVG canvakseen
}

if (process.env.NODE_ENV === "test") {
  module.exports = { drawSVG, modifySVGText, drawSVGToCanvas };
}
