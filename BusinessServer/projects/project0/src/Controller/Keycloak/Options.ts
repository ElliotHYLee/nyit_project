let adminID = "admin"
let adminPW = "admin"
let port = "8080"
let serverIP = `13.52.213.117`
let serverAddr = `http://13.52.213.117:${port}/auth`

export let opt = {
  adminID,
  adminPW,
  serverAddr,
  serverIP,
}

export interface ConfigType {
  method: string
  url: string
  headers: object
  data: object
}

export var baseConfig: ConfigType = {
  method: "",
  url: `${opt.serverAddr}`,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  data: {},
}
