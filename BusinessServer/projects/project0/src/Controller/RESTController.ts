import {
  findAll,
  connect2mdb as connect2mdb,
  logConn,
  deleteAll,
  deleteByIP,
} from "../DBBridge/LogDBHandles"
import { findAllBL, deleteAllBL } from "../DBBridge/BlackListDBHandles"
import * as ctrl from "../Controller/MainController"

export async function basicConnection(req: any, res: any) {
  const [ip, port, good2go] = await ctrl.filterBadIP(req.socket)
  ctrl.logIP(ip, port, good2go)
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
