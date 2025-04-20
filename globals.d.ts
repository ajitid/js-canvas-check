import type { Sdl } from '@kmamal/sdl'
import type { Canvas, CanvasRenderingContext2D } from 'skia-canvas'

export {}

declare global {
  var window: Sdl.Video.Window
  var canvas: Canvas
  var w: number
  var h: number
  var pxw: number
  var pxh: number
  var c: CanvasRenderingContext2D
  var counter: number
}
