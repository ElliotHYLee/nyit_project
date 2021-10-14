let adminID = "admin"
let adminPW = "admin"
let port = "8080"
let serverAddr = `http://52.53.210.87:${port}/auth`

export let opt = {
  adminID,
  adminPW,
  serverAddr,
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
