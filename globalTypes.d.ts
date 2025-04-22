import type { Sdl } from '@kmamal/sdl'
import type { Canvas, SKRSContext2D, Image } from '@napi-rs/canvas'

export {}

declare global {
  var window: Sdl.Video.Window
  var canvas: Canvas
  var width: number
  var height: number
  var pixelWidth: number
  var pixelHeight: number
  var canvasContext: SKRSContext2D
  var counter: number
  // {category : {name : asset}}
  var imageAssets: Map<string, Map<string, Image>>
}
