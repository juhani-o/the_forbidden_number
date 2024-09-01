import { drawSVG } from "./../src/svg.js";

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

describe("drawSVGToCanvas", () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<canvas id="game" width="800" height="600"></canvas>';
  });

  test("should draw the SVG on the canvas", (done) => {
    const svg = exampleSVG;
    const data = { text: "Test Text", blur: 0 };

    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    ctx.drawImage = jest.fn();

    drawSVGToCanvas(svg, data);

    setTimeout(() => {
      expect(ctx.drawImage).toHaveBeenCalled();
      done();
    }, 100);
  });

  test("should apply blur filter if blur is specified", (done) => {
    const svg = exampleSVG;
    const data = { text: "Test Text", blur: 5 };

    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    ctx.filter = "";
    ctx.drawImage = jest.fn();

    drawSVGToCanvas(svg, data);

    setTimeout(() => {
      expect(ctx.filter).toBe("blur(5px)");
      done();
    }, 100);
  });

  test("should not apply blur filter if blur is not specified", (done) => {
    const svg = exampleSVG;
    const data = { text: "Test Text" };

    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    ctx.filter = "";
    ctx.drawImage = jest.fn();

    drawSVGToCanvas(svg, data);

    setTimeout(() => {
      expect(ctx.filter).toBe("");
      done();
    }, 100);
  });
});

describe("drawSVG", () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<canvas id="game" width="800" height="600"></canvas>';
  });

  test("should modify SVG text and draw it on the canvas", (done) => {
    const svgContent = exampleSVG;
    const data = { text: "Final Text", blur: 0 };

    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    ctx.drawImage = jest.fn();

    drawSVG(svgContent, data);

    setTimeout(() => {
      expect(ctx.drawImage).toHaveBeenCalled();
      done();
    }, 100);
  });
});
