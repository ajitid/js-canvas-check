import { setImmediate, setTimeout } from 'node:timers/promises'
import sdl from '@kmamal/sdl'
import { createCanvas } from '@napi-rs/canvas'

import './globals'
import './debug'
import { patchCanvasContext } from './patches'
import { draw } from './draw'

async function setup() {
  counter++
  counter %= 10000
  if (window != null) return false
  window = sdl.video.createWindow({
    title: 'Canvas2D',
    x: 0,
    y: 30,
    resizable: true,
  })
  width = window.width
  height = window.height
  pixelWidth = window.pixelWidth
  pixelHeight = window.pixelHeight
  updateCanvas()
  // there's "expose" event too but it doesn't give anything
  window.on('resize', updateParams)
  return true
}

function updateParams(ctx: sdl.Events.Window.Resize) {
  width = ctx.width
  height = ctx.height
  pixelWidth = ctx.pixelWidth
  pixelHeight = ctx.pixelHeight
  updateCanvas()
}

function updateCanvas() {
  if (canvas == null) {
    canvas = createCanvas(pixelWidth, pixelHeight)
    canvasContext = canvas.getContext('2d')

    // c.reset()'s definition is present, but call is absent
    // missing from @napi-rs/canvas so using it this way.
    patchCanvasContext(canvasContext)
  }
  canvas.width = pixelWidth
  canvas.height = pixelHeight

  canvasContext.resetTransform()
  canvasContext.scale(pixelWidth / width, pixelHeight / height)
}

async function main() {
  await setup()
  while (!window.destroyed) {
    draw()

    window.render(pixelWidth, pixelHeight, pixelWidth * 4, 'rgba32', canvas.data(), {
      scaling: 'linear',
      dstRect: { x: 0, y: 0, width: pixelWidth, height: pixelHeight },
    })

    await setTimeout(0)
  }
}

main()
