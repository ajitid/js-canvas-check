import { setImmediate, setTimeout } from "node:timers/promises";

import sdl from "@kmamal/sdl";
import { createCanvas, type SKRSContext2D } from "@napi-rs/canvas";
// import { draw } from "./draw";

async function setup() {
  const window = sdl.video.createWindow({ title: "Canvas2D", x: 0, y: 30 });
  const { pixelWidth: width, pixelHeight: height } = window;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  return { window, canvas, ctx, width, height };
}

/*
setup/init
update
draw/render
^ take from love2d and raylib
*/

// Roughly translated from https://github.com/ajitid/stellate/blob/c842dc9f628eca52dc9afa689560753d9422a568/main.go#L57-L86
//
// `performance.now()` (equivalent to `sdl.GetPerformanceCounter()`) always gives time in ms.
// So `sdl.GetPerformanceFrequency()` would always be 1000
//
// There's `process.hrtime.bigint()` in nodejs as well if you want nanosecond frequency
const FPS = 60;
const frameDelay = 1000 / FPS;

async function main() {
  const { window, canvas, ctx, width, height } = await setup();
  while (!window.destroyed) {
    const frameStart = performance.now();

    // TODO add this when using skia-canvas
    // ctx.reset();
    draw(ctx, width, height);
    window.render(width, height, width * 4, "rgba32", canvas.data());

    const frameTime = performance.now() - frameStart;
    if (frameTime < frameDelay) {
      await setTimeout(frameDelay - frameTime);
    } else {
      // after referring to this, I think it makes sense to use
      // setImmediate instead https://claude.ai/chat/2d3e9f34-2c96-4386-bee6-b84fd8e5dc31
      await setImmediate();
    }
  }
}

let displayFPSPrev = performance.now();

export function draw(ctx: SKRSContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
  // or
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "white";

  ctx.font = "Inter 44px";
  const now = performance.now();
  ctx.fillText((1000 / (now - displayFPSPrev)).toFixed(2), 40, 40);
  displayFPSPrev = now;
}

main();
