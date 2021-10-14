import { getAddress } from "./ConnLogs/Utils"
import { findAllBL, deleteAllBL } from "../../DBBridge/Gateway/BlackListDBHandles"
import { ShortTermMemory } from "./ConnLogs/ShortTermMemory"
import { logConn } from "../../DBBridge/Gateway/LogDBHandles"

export async function filterBadIP(socket: any): Promise<any> {
  const [ip, port] = getAddress(socket)
  console.log(ip)
  var good2go: boolean = true
  if (ip != "172.17.0.1") {
    var blackList: any = await findAllBL()
    for (let i = 0; i < blackList.length; i++) {
      var blackIP: string = blackList[i].ip
      if (blackIP == ip) {
        good2go = false
        break
      }
    }

    // check short term memeory IP
    if (good2go) good2go &&= ShortTermMemory.Instance().checkIP(ip)
  }

  return [ip, port, good2go]
}

export async function logIP(
  ip: string,
  port: string,
  good2go: boolean
): Promise<boolean> {
  var result: boolean = true
  try {
    logConn(ip, port, good2go)
  } catch {
    result = false
  }
  return result
}
