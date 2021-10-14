import { SessionManager } from "../../Session/SessionMan"

export class GQLDataMan {
  static _instance: GQLDataMan
  public static Instance(): GQLDataMan {
    if (!GQLDataMan._instance) {
      GQLDataMan._instance = new GQLDataMan()
    }
    return this._instance
  }

  public test0: string
  sessionman: SessionManager

  constructor() {
    this.test0 = "first value"
    this.sessionman = SessionManager.Instnace()
  }
}
