import { drawSVG, modifySVGText, drawSVGToCanvas } from "./../src/svg.js";
import "jest-canvas-mock";

const exampleSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text id="tspan1594" x="10" y="20">Old Text</text>
</svg>
`;

describe("modifySVGText", () => {
  test("should modify the text content of the SVG", () => {
    const svgString = exampleSVG;
    const newText = "New Text";
    const modifiedSVG = modifySVGText(svgString, newText);

    expect(modifiedSVG).toContain(newText);
    expect(modifiedSVG).not.toContain("Old Text");
  });

  test("should return the original SVG if the text element is not found", () => {
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text id="differentID" x="10" y="20">Old Text</text>
      </svg>
    `;
    const newText = "New Text";
    const modifiedSVG = modifySVGText(svgString, newText);

    expect(modifiedSVG).toContain("Old Text");
    expect(modifiedSVG).not.toContain(newText);
  });
});

describe("drawSVG", () => {
  test("should call drawImage when image is loaded", () => {
    // Mockataan canvasin konteksti ja drawImage-funktio
    const ctx = {
      drawImage: jest.fn(),
      fillRect: jest.fn(),
    };
    const canvas = {
      getContext: () => ctx,
      width: 600,
      height: 400,
    };

    // Mockataan dokumentti ja canvaselementti
    document.getElementById = jest.fn().mockReturnValue(canvas);

    // Mockataan Image-objekti
    const mockImage = {
      onload: null,
      src: "",
      width: 100,
      height: 100,
    };
    global.Image = jest.fn(() => mockImage);

    const svgContent = '<svg><rect width="100" height="100" /></svg>';
    const data = { text: "New Text", blur: 5 };

    drawSVG(ctx, svgContent, data);

    // Kutsutaan onload-tapahtumankäsittelijää manuaalisesti
    mockImage.onload();

    // Tarkistetaan, että drawImage kutsuttiin
    expect(ctx.drawImage).toHaveBeenCalled();
  });
});
