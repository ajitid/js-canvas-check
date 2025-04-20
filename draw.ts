let displayFPSPrev = performance.now()

export function draw() {
  const { c } = globalThis
  // clear canvas:

  // TODO add this when using skia-canvas
  // ctx.reset();

  c.clearRect(0, 0, w, h)
  // or
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, width, height);

  // draw commands:

  c.fillStyle = 'blue'
  c.fillRect(0, 0, w, h)

  c.fillStyle = 'white'

  c.font = 'Inter 44px'
  const now = performance.now()
  c.fillText((1000 / (now - displayFPSPrev)).toFixed(2), 40, 40)
  displayFPSPrev = now
}
