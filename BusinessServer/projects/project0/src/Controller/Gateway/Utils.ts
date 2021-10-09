export function getAddress(socket: any): string[] {
  var temp = socket.remoteAddress.toString()
  var ip = temp.split(":")[3]
  var port = socket.remotePort
  return [ip, port]
}

export function delayHours(h: number) {
  return delayMinutes(h * 60)
}

export function delayMinutes(m: number) {
  return delaySeconds(m * 60)
}

export function delaySeconds(s: number) {
  return delay(s * 1000)
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
