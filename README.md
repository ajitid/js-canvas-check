# rscanvascheck

Didn't choose @napi-rs/canvas (https://github.com/Brooooooklyn/canvas) because:

- skia-canvas has better docs
  - Albeit incomplete at times. `GlobalCompositeOperation` for example, isn't mentioned but available. (Find it in `node_modules\skia-canvas\lib\index.d.ts`) | [quick notes on it](https://grok.com/chat/0c55f0df-6a59-4099-9e7c-b7c7d9aa9306)
- On my Windows when monitor is plugged in, I'm seeing slightly blurry output of font from @napi-rs/canvas
- @napi-rs/canvas has computeTightBounds, but I don't think I'd ever need it
  - https://github.com/mono/SkiaSharp/issues/151
  - https://chromium.googlesource.com/skia/+/ac47b88d3c4b6232ea8664cea99fbd8394f2dc38/site/user/api/SkPath_Reference.md#computetightbounds
  - Usually I'd need to compute bounds for a set of points. And for that there are different algorithms that exist

That being said this guy has very useful packages. For example:

- [clipboard](https://github.com/Brooooooklyn/Clipboard)
- compression
  - https://github.com/Brooooooklyn/lzma
  - https://github.com/Brooooooklyn/snappy
- Image processing
  - https://github.com/Brooooooklyn/Image
- Git
  - https://github.com/Brooooooklyn/simple-git
  - https://github.com/steveukx/git-js
- Keyring/Keychain
  - https://github.com/Brooooooklyn/keyring-node
  - An alternative impl. that doesn't invoke password prompt can be found in salesforce CLI

For alternative hot-reload and on improving bun's hot reload, see:

- https://github.com/braidnetworks/dynohot
- https://github.com/oven-sh/bun/discussions/10826#discussioncomment-12843546
- More on implementation:
  - https://dev.to/aabccd021/live-reload-html-with-bun-55p5
  - https://github.com/vitejs/vite/discussions/4577#discussioncomment-1161007
