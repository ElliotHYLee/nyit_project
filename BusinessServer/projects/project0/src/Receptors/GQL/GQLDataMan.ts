export class GQLDataMan {
  static _instance: GQLDataMan
  public static Instance(): GQLDataMan {
    if (!GQLDataMan._instance) {
      GQLDataMan._instance = new GQLDataMan()
    }
    return this._instance
  }
  public test0: string
  constructor() {
    this.test0 = "first value"
  }
}
