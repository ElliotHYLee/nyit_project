export interface UserInfoType {
  tokenPack: any
  user_email: string
  user_first_name: string
  user_last_name: string
  user_card: number
  user_card_name: string
}

export interface TravelType {
  user_email: string
  bus_id: string
  travel_duration: number
  departure_city: string
  departure_date: Date
  arrival_city: string
  price: number
}

export class UserSession {
  user_info: UserInfoType
  travels: TravelType[]

  constructor(user_info: UserInfoType) {
    this.user_info = user_info
    this.travels = []
  }

  public addTravel(travel: TravelType) {
    this.travels.push(travel)
  }

  public getEmail() {
    return this.user_info.user_email
  }

  public getUserInfo() {
    return this.user_info
  }

  public getTravels() {
    return this.travels
  }

  public validateToken(token: string): boolean {
    console.log(token)
    console.log(this.user_info.tokenPack)
    console.log("=========")
    if (token == this.user_info.tokenPack.token) return true
    else return false
  }
}
