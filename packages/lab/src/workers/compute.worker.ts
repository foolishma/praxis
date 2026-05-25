function fibonacci(n: number): number {
  if (n <= 1) return n
  let a = 0
  let b = 1
  for (let i = 2; i <= n; i++) {
    const next = a + b
    a = b
    b = next
  }
  return b
}

self.onmessage = (event: MessageEvent<number>) => {
  const start = performance.now()
  const result = fibonacci(event.data)
  const duration = performance.now() - start
  self.postMessage({ result, duration })
}