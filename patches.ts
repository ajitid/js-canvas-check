import type { SKRSContext2D } from '@napi-rs/canvas'

export function patchCanvasContext(canvasContext: SKRSContext2D) {
  canvasContext.reset = function reset() {
    const { canvasContext: c } = globalThis

    c.clearRect(0, 0, width, height)

    // Reset transformation matrix to identity
    c.setTransform(1, 0, 0, 1, 0, 0)

    // Reset all drawing state variables to their default values
    c.globalAlpha = 1.0
    c.globalCompositeOperation = 'source-over'
    c.strokeStyle = '#000000'
    c.fillStyle = '#000000'
    c.shadowOffsetX = 0
    c.shadowOffsetY = 0
    c.shadowBlur = 0
    c.shadowColor = 'rgba(0, 0, 0, 0)'
    c.lineWidth = 1
    c.lineCap = 'butt'
    c.lineJoin = 'miter'
    c.miterLimit = 10
    c.lineDashOffset = 0
    c.font = '10px sans-serif'
    c.textAlign = 'start'
    c.textBaseline = 'alphabetic'
    c.direction = 'inherit'
    c.imageSmoothingEnabled = true

    // Reset any custom line dash setting
    if (c.setLineDash) {
      c.setLineDash([])
    }

    // Clear any current path
    c.beginPath()
  }
}
