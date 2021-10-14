import { findAll, deleteAll, deleteByIP } from "../../DBBridge/Gateway/LogDBHandles"
import { findAllBL, deleteAllBL } from "../../DBBridge/Gateway/BlackListDBHandles"
import * as ctrl from "../Gateway/GatewayController"
import crypto from "../AES"
import {
  createDummySchedules,
  deleteAllBusSchedule,
  findAllBus,
} from "../../DBBridge/Bus/BUSDBHandle"

export async function basicConnection(req: any, res: any) {
  const [ip, port, good2go] = await ctrl.filterBadIP(req.socket)
  ctrl.logIP(ip, port, good2go)
  if (good2go) res.send("hi")
  else res.send("you are probably blocked")
}

export async function showLogs(req: any, res: any) {
  var x: any = await findAll()
  res.send(x)
}

export async function deleteAllLogs(req: any, res: any) {
  var x: any = await deleteAll()
  res.send(x)
}

export async function deleteIP(req: any, res: any) {
  var ip: string = req.body.ip
  console.log(ip)
  await deleteByIP(ip)
  res.send("done")
}

// Blacklist debugger fucntions
export async function getAllBlackList(req: any, res: any) {
  var x = await findAllBL()
  res.send(x)
}
export async function deleteAllBlackList(req: any, res: any) {
  var x = await deleteAllBL()
  res.send(x)
}

export async function adminLogin(req: any, res: any) {
  console.log(req.body)
  try {
    var adminId: any = crypto.decrypt(req.body.id)
    var adminPw: any = crypto.decrypt(req.body.pw)
  } catch (e) {
    //console.log(e)
  }
  console.log(adminId, adminPw)
  if (adminId == "admin@nyit.edu" && adminPw == "admin") {
    const result: any = JSON.stringify({
      token: "hello admin toekn",
      duration: 3600,
    })
    const token = crypto.encrypt(result)
    console.log(token)
    res.send(token)
  } else {
    res.send("invalid request")
  }
}

export async function findAllDummyBusSchedule(req: any, res: any) {
  var x = await findAllBus()
  res.send(x)
}

export async function createDummyBusSchedule(req: any, res: any) {
  var x = await createDummySchedules()
  await new Promise((resolve) => setTimeout(resolve, 1000))
  res.send(x)
}

export async function deleteDummyBusSchedule(req: any, res: any) {
  var x = await deleteAllBusSchedule()
  res.send(x)
}
