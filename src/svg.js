function modifySVGContent(svgString, newText, elementId) {
  const parser = new DOMParser();
  const svgDocument = parser.parseFromString(svgString, "image/svg+xml");

  const numberElement = svgDocument.getElementById(elementId);
  if (numberElement) {
    numberElement.textContent = newText;
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgDocument);
}

function drawSVGToCanvas(ctx, svg, data) {
  const { x, y, w, h, blur } = data;
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
  let modifiedSVG = null;
  if (data.text) {
    modifiedSVG = modifySVGContent(svgContent, data.text, "tspan1594");
  } else if (data.number) {
    modifiedSVG = modifySVGContent(svgContent, data.number, "tspan1102");
  } else {
    modifiedSVG = svgContent;
  }
  drawSVGToCanvas(ctx, modifiedSVG, data); // Piirretään SVG canvakseen
}

if (process.env.NODE_ENV === "test") {
  module.exports = { drawSVG, modifySVGContent, drawSVGToCanvas };
}
