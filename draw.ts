let displayFPSPrev = performance.now()

export function draw() {
  const { c, w, h } = globalThis
  // clear canvas:

  c.reset()
  c.fillStyle = 'black'
  c.fillRect(0, 0, w, h)

  // draw commands:

  showFps()
}

function showFps() {
  c.fillStyle = 'white'
  c.font = '18px Inter'
  const now = performance.now()
  c.fillText((1000 / (now - displayFPSPrev)).toFixed(2), 40, 40)
  displayFPSPrev = now
}
