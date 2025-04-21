import type { Sdl } from '@kmamal/sdl'
import type { Canvas, CanvasRenderingContext2D, Image } from 'skia-canvas'

export {}

declare global {
  var window: Sdl.Video.Window
  var canvas: Canvas
  var width: number
  var height: number
  var pixelWidth: number
  var pixelHeight: number
  var canvasContext: CanvasRenderingContext2D
  var counter: number
  // {category : {name : asset}}
  var imageAssets: Map<string, Map<string, Image>>
}
