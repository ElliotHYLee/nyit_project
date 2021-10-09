import express from "express"
import cors from "cors"
import { connect2mdb } from "../../DBBridge/LogDBHandles"
import * as rest from "../../Controller/RESTController"

export class ExpressApp {
  app: any
  port: number
  constructor() {
    this.app = express()
    this.port = 3000
    this.app.use(express.json())
    this.app.use(cors())
    connect2mdb()
    this.app.get("/", rest.basicConnection)
    this.app.get("/show", rest.showLogs)
    this.app.get("/deleteall", rest.deleteAllLogs)
    this.app.get("/deletebyip", rest.deleteIP)
    this.app.get("/showbl", rest.getAllBlackList)
    this.app.get("/deleteallbl", rest.deleteAllBlackList)
  }
  public runServer() {
    this.app.listen(this.port, () => {
      console.log(`server started at http://localhost:${this.port}`)
    })
  }
}
