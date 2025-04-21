function printMem(name = '-') {
  const mem = process.memoryUsage()
  const rss = (mem.rss / 1024 / 1024).toFixed(0).padStart(3)
  const heap = (mem.heapUsed / 1024 / 1024).toFixed(0).padStart(3)
  const external = (mem.external / 1024 / 1024).toFixed(0).padStart(3)

  console.log(`${rss} MiB / ${heap} MiB / ${external} MiB / ${name}`)
}

// Uncomment to log memory stats
// printMem()
// setInterval(() => void printMem(), 4000)
