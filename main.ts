import { setImmediate, setTimeout } from 'node:timers/promises'
import sdl from '@kmamal/sdl'
import { Canvas } from 'skia-canvas'
import { draw } from './draw'
import './debug'

const nil: any = null
globalThis.window = nil
globalThis.canvas = nil
globalThis.width = 4
globalThis.height = 4
globalThis.pixelWidth = 4
globalThis.pixelHeight = 4
globalThis.canvasContext = nil
globalThis.counter = 0
globalThis.imageAssets = new Map()

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
    canvas = new Canvas(pixelWidth, pixelHeight)
    canvasContext = canvas.getContext('2d')
    canvasContext.fontHinting = true
  }
  canvas.width = pixelWidth
  canvas.height = pixelHeight

  canvasContext.resetTransform()
  canvasContext.scale(pixelWidth / width, pixelHeight / height)
}

const targetFPS = 60
const targetDeltaTime = 1000 / targetFPS // in milliseconds
const maxFrameSkip = 4
const fixedTimeStep = 1000 / 60 // in milliseconds

async function main() {
  const firstTime = await setup()
  const currentCount = counter

  let previousTime = performance.now()
  let lag = 0
  while (!window.destroyed && counter === currentCount) {
    const currentTime = performance.now()
    const elapsed = currentTime - previousTime
    previousTime = currentTime
    lag += elapsed

    handleInput()

    // Update game logic in fixed intervals with frame skipping
    let frameCount = 0
    while (lag >= fixedTimeStep && frameCount < maxFrameSkip) {
      update(fixedTimeStep)
      lag -= fixedTimeStep
      frameCount++
    }

    // If we skipped the maximum number of frames, reset lag to avoid spiral of death
    if (frameCount >= maxFrameSkip) {
      // console.log("Warning: Hit max frame skip limit, resetting lag");
      lag = 0
    }

    // Render the current state
    draw()
    // `canvas.toBufferSync()`'s default color type is 'RGBA8888', which matches with SDL's 'rgba32'
    window.render(
      pixelWidth,
      pixelHeight,
      pixelWidth * 4,
      'rgba32',
      canvas.toBufferSync('raw'),
      { scaling: 'linear', dstRect: { x: 0, y: 0, width: pixelWidth, height: pixelHeight } }
    )

    // Calculate time taken for frame and sleep if necessary
    const frameTime = performance.now() - currentTime
    const sleepTime = Math.max(0, targetDeltaTime - frameTime)
    if (sleepTime > 0) {
      await setTimeout(sleepTime)
    } else {
      await setImmediate()
    }
  }
}

function handleInput() {}

function update(fixedTimeStep: number) {}

main()
