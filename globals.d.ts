import type { Sdl } from "@kmamal/sdl";
import type { Canvas, SKRSContext2D } from "@napi-rs/canvas";

export {};

declare global {
  var window: Sdl.Video.Window;
  var canvas: Canvas;
  var w: number;
  var h: number;
  var pxw: number;
  var pxh: number;
  var c: SKRSContext2D;
}
