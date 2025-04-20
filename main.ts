import promises from "node:fs/promises";
import { join } from "node:path";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const canvas = createCanvas(300, 320);
const ctx = canvas.getContext("2d");

ctx.lineWidth = 10;
ctx.strokeStyle = "#03a9f4";
ctx.fillStyle = "#03a9f4";

ctx.clip;
// Wall
ctx.strokeRect(75, 140, 150, 110);

// Door
ctx.fillRect(130, 190, 40, 60);

// Roof
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();

async function main() {
  // load images from disk or from a URL
  // const catImage = await loadImage(
  //   "../../../../Music/mymusic/5 Seconds of Summer/poster.jpg"
  // );
  // const dogImage = await loadImage("https://example.com/path/to/dog.jpg");

  // ctx.drawImage(catImage, 0, 0, catImage.width, catImage.height);

  // ctx.drawImage(
  //   dogImage,
  //   canvas.width / 2,
  //   canvas.height / 2,
  //   dogImage.width,
  //   dogImage.height
  // );

  // export canvas as image
  const pngData = await canvas.encode("png"); // JPEG, AVIF and WebP are also supported
  // encoding in libuv thread pool, non-blocking
  await promises.writeFile(join(__dirname, "simple.png"), pngData);
}

main();
