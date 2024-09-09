export function drawTimerBar(ctx, barAmount, startY, cw, ch) {
  ctx.filter = "blur(0px)";
  ctx.fillStyle = "black";
  ctx.fillRect(0, startY, cw, ch);
  ctx.fillStyle = "yellow";
  ctx.fillRect(0, startY, barAmount, ch);
  ctx.fillStyle = "black";
}
