import { UserSession, UserInfoType, TravelType } from "./UserSession"

export class SessionManager {
  private static _instance: SessionManager

  public static Instnace() {
    if (!this._instance) this._instance = new SessionManager()
    return this._instance
  }

  sessionList: UserSession[]
  constructor() {
    this.sessionList = []
  }

  public userIsLogged(email: string): any {
    var result = false
    var index = -1
    for (var i: number = 0; i < this.sessionList.length; i++) {
      if (this.sessionList[i].getEmail() == email) {
        result = true
        index = i
        break
      }
    }
    return [result, index]
  }

  public getUserAt(index: number) {
    return this.sessionList[index]
  }

  public addNewUserSession(user_info: UserInfoType, travels: TravelType[]) {
    var user = new UserSession(user_info)
    for (var i: number = 0; i < travels.length; i++) {
      var t: TravelType = {
        user_email: travels[i].user_email,
        bus_id: travels[i].bus_id,
        travel_duration: travels[i].travel_duration,
        departure_city: travels[i].departure_city,
        departure_date: travels[i].departure_date,
        arrival_city: travels[i].departure_city,
        price: travels[i].price,
      }
      user.addTravel(t)
    }
    this.sessionList.push(user)
    console.log("added new user session")
    console.log(this.sessionList.length)
  }

  public endUserSessionByIndex(index: number) {
    this.sessionList.splice(index, 1)
  }

  public endUserSessionByUserInfo(user_info: UserInfoType) {
    var [hasUser, index] = this.userIsLogged(user_info.user_email)
    if (hasUser) this.sessionList.splice(index, 1)
    else {
      console.log("user isn't logged in")
    }
  }
}
