let prevTimestamp = performance.now()

let minFps = Infinity,
  maxFps = 0
setInterval(() => {
  console.log(minFps, maxFps)
  minFps = Infinity
  maxFps = 0
}, 2000)

export function draw() {
  const c = canvasContext,
    w = width,
    h = height

  // clear canvas:
  c.reset()
  c.fillStyle = 'black'
  c.fillRect(0, 0, w, h)

  // draw commands:
  c.fillStyle = 'violet'
  c.arc(w / 2, h / 2, w / 4, 0, 2 * Math.PI)
  c.fill()

  // show stats:
  showFps()
}

function showFps() {
  const c = canvasContext

  c.fillStyle = 'white'
  c.font = '18px Inter'
  const now = performance.now()
  const fpsStr = (1000 / (now - prevTimestamp)).toFixed(2)
  c.fillText(fpsStr, 40, 40)
  prevTimestamp = now

  const fps = parseFloat(fpsStr)
  minFps = Math.min(minFps, fps)
  maxFps = Math.max(maxFps, fps)
}
