import { delaySeconds } from "./Utils"
import { findAllBL, saveBlackList } from "../../DBBridge/BlackListDBHandles"
import * as policy_bl from "./GateWayPolicy"

export class ShortTermMemory {
  static _instance: ShortTermMemory
  public static Instance(): ShortTermMemory {
    if (!ShortTermMemory._instance) {
      ShortTermMemory._instance = new ShortTermMemory()
    }
    return this._instance
  }
  ipList: string[] // implicitly public in typescript
  idx: number

  async refresher() {
    while (true) {
      this.ipList = new Array()
      await delaySeconds(policy_bl.shortTermMemoryRefresherTimeSecond)
      console.log("refreshed")
    }
  }

  constructor() {
    this.ipList = new Array()
    this.idx = 0
    this.refresher()
  }

  private nextIdx() {
    if (this.idx < 100) this.idx++
    else this.idx = 0
  }

  storeIP(newIP: string) {
    this.ipList[this.idx] = newIP
    this.nextIdx()
  }

  checkIP(newIP: string): boolean {
    this.storeIP(newIP)
    var cnt: number = 0
    var flag: boolean = false
    this.ipList.forEach((ip) => {
      if (ip == newIP) cnt++
      console.log(cnt)
      if (cnt >= policy_bl.blackListTolereanceFrequency) {
        flag = true
        saveBlackList(newIP)
      }
    })
    if (flag) return false
    else return true
  }
}
