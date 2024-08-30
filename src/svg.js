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

function drawSVGToCanvas(svg, blur) {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  ctx.filter = "blur(" + blur + "px)";
  const img = new Image();
  const svgData = "data:image/svg+xml;base64," + btoa(svg);
  img.onload = function () {
    const w = 300;
    const h = w * (img.height / img.width);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      canvas.width / 2 - w / 2,
      canvas.height / 2 - h / 2 + blur * 5,
      w,
      h,
    ); // Piirretään kuva canvakseen
  };
  img.src = svgData;
}

export const drawSVG = (svgContent, data) => {
  const modifiedSVG = modifySVGText(svgContent, "13"); // Muokataan SVG
  drawSVGToCanvas(modifiedSVG, 0); // Piirretään SVG canvakseen
};
