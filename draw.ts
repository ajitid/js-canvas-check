import { img } from './assets'

let prevTimestamp = performance.now()

export function draw() {
  const c = canvasContext,
    w = width,
    h = height

  // clear canvas:
  c.reset()
  c.fillStyle = 'black'
  c.fillRect(0, 0, w, h)

  // draw commands:
  c.drawImage(img, 0, 0)

  // show stats:
  showFps()
}

function showFps() {
  const c = canvasContext,
    w = width,
    h = height

  c.fillStyle = 'white'
  c.font = '18px Inter'
  const now = performance.now()
  c.fillText((1000 / (now - prevTimestamp)).toFixed(2), 40, 40)
  prevTimestamp = now
}
