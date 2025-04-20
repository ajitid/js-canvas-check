import { setImmediate, setTimeout } from "node:timers/promises";

import sdl from "@kmamal/sdl";
import { createCanvas, type Canvas, type SKRSContext2D } from "@napi-rs/canvas";
// import { draw } from "./draw";

let window: sdl.Sdl.Video.Window,
  canvas: Canvas,
  w: number,
  h: number,
  c: SKRSContext2D;

async function setup() {
  window = sdl.video.createWindow({ title: "Canvas2D", x: 0, y: 30 });
  w = window.width;
  h = window.height;
  canvas = createCanvas(w, h);
  c = canvas.getContext("2d");
}

const targetFPS = 60;
const targetDeltaTime = 1000 / targetFPS; // in milliseconds
const maxFrameSkip = 4;
const fixedTimeStep = 1000 / 60; // in milliseconds

async function main() {
  await setup();

  let previousTime = performance.now();
  let lag = 0;
  while (!window.destroyed) {
    const currentTime = performance.now();
    const elapsed = currentTime - previousTime;
    previousTime = currentTime;
    lag += elapsed;

    handleInput();

    // Update game logic in fixed intervals with frame skipping
    let frameCount = 0;
    while (lag >= fixedTimeStep && frameCount < maxFrameSkip) {
      update(fixedTimeStep);
      lag -= fixedTimeStep;
      frameCount++;
    }

    // If we skipped the maximum number of frames, reset lag to avoid spiral of death
    if (frameCount >= maxFrameSkip) {
      // console.log("Warning: Hit max frame skip limit, resetting lag");
      lag = 0;
    }

    // Render the current state
    draw();
    window.render(w, h, w * 4, "rgba32", canvas.data(), { scaling: "linear" });

    // Calculate time taken for frame and sleep if necessary
    const frameTime = performance.now() - currentTime;
    const sleepTime = Math.max(0, targetDeltaTime - frameTime);
    if (sleepTime > 0) {
      await setTimeout(sleepTime);
    } else {
      await setImmediate();
    }
  }
}

function handleInput() {}

function update(fixedTimeStep: number) {}

let displayFPSPrev = performance.now();
export function draw() {
  // clear canvas:

  // TODO add this when using skia-canvas
  // ctx.reset();

  c.clearRect(0, 0, w, h);
  // or
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, width, height);

  // draw commands:

  c.fillStyle = "white";

  c.font = "Inter 44px";
  const now = performance.now();
  c.fillText((1000 / (now - displayFPSPrev)).toFixed(2), 40, 40);
  displayFPSPrev = now;
}

main();
