export function drawTimerBar(barAmount, startY, cw, ch) {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  ctx.filter = "blur(0px)";
  ctx.fillStyle = "black";
  ctx.fillRect(0, startY, cw, ch);
  ctx.fillStyle = "yellow";
  ctx.fillRect(0, startY, barAmount, ch);
  ctx.fillStyle = "black";
}
