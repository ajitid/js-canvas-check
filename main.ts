import { setImmediate, setTimeout } from 'node:timers/promises'
import sdl from '@kmamal/sdl'
import { createCanvas } from '@napi-rs/canvas'

function updateCanvas() {
  if (globalThis.canvas == null) {
    globalThis.canvas = createCanvas(globalThis.pxw, globalThis.pxh)
    globalThis.c = globalThis.canvas.getContext('2d')
  }
  globalThis.canvas.width = pxw
  globalThis.canvas.height = pxh

  globalThis.c.resetTransform()
  globalThis.c.scale(pxw / w, pxh / h)
}

async function setup() {
  if (globalThis.window != null) return false
  globalThis.window = sdl.video.createWindow({
    title: 'Canvas2D',
    x: 0,
    y: 30,
    resizable: true,
  })
  globalThis.w = globalThis.window.width
  globalThis.h = globalThis.window.height
  globalThis.pxw = globalThis.window.pixelWidth
  globalThis.pxh = globalThis.window.pixelHeight
  updateCanvas()
  return true
}

const targetFPS = 60
const targetDeltaTime = 1000 / targetFPS // in milliseconds
const maxFrameSkip = 4
const fixedTimeStep = 1000 / 60 // in milliseconds

function updateParams(ctx: sdl.Events.Window.Resize) {
  globalThis.w = ctx.width
  globalThis.h = ctx.height
  globalThis.pxw = ctx.pixelWidth
  globalThis.pxh = ctx.pixelHeight
  updateCanvas()
}

async function main() {
  const firstTime = await setup()
  if (!firstTime) {
    return
  }

  // there's "expose" event too but it doesn't give anything
  globalThis.window.on('resize', updateParams)

  let previousTime = performance.now()
  let lag = 0
  while (!window.destroyed) {
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
    window.render(pxw, pxh, pxw * 4, 'rgba32', canvas.data(), {
      scaling: 'linear',
      dstRect: { x: 0, y: 0, width: pxw, height: pxh },
    })

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

main()
