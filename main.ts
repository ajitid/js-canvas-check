import { setImmediate, setTimeout } from 'node:timers/promises'
import sdl from '@kmamal/sdl'
import { createCanvas } from '@napi-rs/canvas'
import { draw } from './draw'

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
  globalThis.counter ??= 0
  globalThis.counter++
  globalThis.counter %= 10000
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
  // there's "expose" event too but it doesn't give anything
  globalThis.window.on('resize', updateParams)
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
  const currentCount = globalThis.counter

  let previousTime = performance.now()
  let lag = 0
  while (!window.destroyed && globalThis.counter === currentCount) {
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

main()
