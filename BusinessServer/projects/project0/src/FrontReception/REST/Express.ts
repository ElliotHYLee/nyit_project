import express from "express"
import cors from "cors"
import * as rest from "../../Controller/FrontReception/RESTController"

export class ExpressApp {
  app: any
  port: number
  constructor() {
    this.app = express()
    this.port = 3000
    this.app.use(express.urlencoded())
    this.app.use(express.json())
    this.app.use(cors())
    this.app.get("/", rest.basicConnection)
    this.app.get("/show", rest.showLogs)
    this.app.get("/deletealllogs", rest.deleteAllLogs)
    this.app.get("/deletebyip", rest.deleteIP)
    this.app.get("/showbl", rest.getAllBlackList)
    this.app.get("/deleteallbl", rest.deleteAllBlackList)
    this.app.post("/admin", rest.adminLogin) // todo: whitelist ip
    this.app.get("/createdummybusschedule", rest.createDummyBusSchedule)
    this.app.get("/finddummybusschedule", rest.findAllDummyBusSchedule)
    this.app.get("/deletedummybusschedule", rest.deleteDummyBusSchedule)
  }
  public runServer() {
    this.app.listen(this.port, () => {
      console.log(`server started at http://localhost:${this.port}`)
    })
  }
}
