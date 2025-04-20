import promises from "node:fs/promises";
import { join } from "node:path";
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

async function main() {
  const { window, canvas, ctx, width, height } = await setup();
  while (!window.destroyed) {
    // TODO add this when using skia-canvas
    // ctx.reset();
    draw(ctx, width, height);
    window.render(width, height, width * 4, "rgba32", canvas.data());
    await setImmediate();
  }
}

let t = performance.now();

export function draw(ctx: SKRSContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
  // or
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "white";

  ctx.font = "Inter 44px";
  const now = performance.now();
  ctx.fillText((now - t).toString(), 40, 40);
  t = now;
}

main();
