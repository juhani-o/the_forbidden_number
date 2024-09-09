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

function drawSVGToCanvas(ctx, svg, data) {
  const { x, y, w, h, blur } = data;
  const canvas = document.getElementById("game");
  const svgData = "data:image/svg+xml;base64," + btoa(svg);
  const img = new Image();
  img.onload = function () {
    ctx.filter = "blur(" + blur + "px)";
    ctx.drawImage(img, x, y, w, h); // Piirretään kuva canvaokseen
  };
  img.src = svgData;
}

export function clearCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function drawSVG(ctx, svgContent, data) {
  const modifiedSVG = modifySVGText(svgContent, data.text); // Muokataan SVG
  drawSVGToCanvas(ctx, modifiedSVG, data); // Piirretään SVG canvakseen
}

if (process.env.NODE_ENV === "test") {
  module.exports = { drawSVG, modifySVGText, drawSVGToCanvas };
}
