/*
 * SVG related drawing modification functions
 */

const cachedImages = new Map();

//  Alter text in SVG files

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

// Draw SVG to canvas.

async function drawSVGToCanvas(ctx, svg, data) {
  const { x, y, w, h, blur } = data;
  let iX,
    iY,
    iW,
    iH = 0;

  // Let's create cache for images. This gave pretty good perfomance boost!
  let img = cachedImages.get(svg);

  if (!img) {
    const svgData = "data:image/svg+xml;base64," + btoa(svg);
    img = new Image();

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = svgData;
    });

    cachedImages.set(svg, img);
  }

  ctx.filter = `blur(${blur}px)`;

  // If x and y are (intentionally) left empty we presume that
  // image will be set on middle of the screen
  // Image width comes from SVG file. Inkscape was used for editing.

  if (x === undefined && y === undefined) {
    iX = ctx.canvas.width / 2;
    iY = ctx.canvas.height / 2;
    iW = img.width;
    iH = img.height;
    ctx.drawImage(img, iX - iW / 2, iY - iH / 2, iW, iH);
  } else {
    ctx.drawImage(img, x, y, w, h);
  }
  ctx.filter = "none";
}

export function clearCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// I did not find out soon enough how to query XML elements
// so I had to find text element this way....

export function drawSVG(ctx, svgContent, data) {
  let modifiedSVG = null;
  if (data.text) {
    modifiedSVG = modifySVGContent(svgContent, data.text, "tspan1594");
  } else if (data.number) {
    modifiedSVG = modifySVGContent(svgContent, data.number, "tspan1037");
  } else {
    modifiedSVG = svgContent;
  }
  drawSVGToCanvas(ctx, modifiedSVG, data); // Piirretään SVG canvakseen
}

// These exports were used to create tests.
// I did not want to export all by default.
if (process.env.NODE_ENV === "test") {
  module.exports = { drawSVG, modifySVGContent, drawSVGToCanvas };
}
