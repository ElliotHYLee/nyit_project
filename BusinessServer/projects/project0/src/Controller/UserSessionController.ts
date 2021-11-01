import * as kc from "../Controller/Keycloak/Keycloak"
import * as ticketAPI from "../DBBridge/Tickets/TicketHandle"
import { findUserByEmail } from "../DBBridge/UserInfo/UserInfoDBHandle"
import { SessionManager } from "../Session/SessionMan"
import { TravelType, UserInfoType } from "../Session/UserSession"

export async function getUserToken(raw: any) {
  var encrypted: string = raw.data
  // id & pw = decrypt(encryptedString)
  var decrypted: string = encrypted
  var data: any = JSON.parse(decrypted)
  var user_email: string = data.user_email
  var pw: string = data.pw

  // get keycloack user token
  console.log("getting kc")
  console.log(user_email)
  var result = await kc.requestClientToken(user_email, pw)
  console.log(result)
  if (result.status == -1) return { status: -1, data: {} }

  var token = result.data.access_token
  //   console.log(token)
  var now = new Date()
  var duration_sec = 1000 * 60 * 60
  var expiration = new Date(now.getTime() + duration_sec) // 1 hour expiration

  var tokenPack = {
    token: token,
    expiration: expiration.toISOString().slice(0, 19),
    duration: duration_sec,
  }

  return { status: 1, data: { user_email: user_email, tokenPack: tokenPack } } //[user_email, tokenPack]
}

export async function createUserSession(user_email: any, tokenPack: any) {
  //check if sessionis already there
  var [isLogged, index] = SessionManager.Instnace().userIsLogged(user_email)
  if (isLogged) {
    SessionManager.Instnace().endUserSessionByIndex(index)
  }

  // find user_info from mongo
  var user_info_raw = (await findUserByEmail(user_email))[0]
  // create user_info type
  var user_info: UserInfoType = {
    tokenPack: tokenPack,
    user_email: user_info_raw.user_email,
    user_first_name: user_info_raw.user_first_name,
    user_last_name: user_info_raw.user_last_name,
    user_card: user_info_raw.user_card,
    user_card_name: user_info_raw.user_card_name,
  }

  // find user's travel info from mongo
  var tickets: [] = await ticketAPI.findTicketByEmail(user_info.user_email)

  // create travels type
  var travels: TravelType[] = []
  if (tickets.length > 0) {
    tickets.forEach((ticket: any) => {
      var travel: TravelType = {
        user_email: ticket.user_email,
        bus_id: ticket.bus_id,
        travel_duration: ticket.travel_duration,
        departure_city: ticket.departure_city,
        departure_date: ticket.departure_date,
        arrival_city: ticket.arrival_city,
        price: ticket.price,
      }
      travels.push(travel)
    })
  }

  // create session
  SessionManager.Instnace().addNewUserSession(user_info, travels)

  //check for debug
  var x = SessionManager.Instnace().getUserAt(0)
  console.log(x)
}

export function validateRequestedUser(user_email: string, token: any): any {
  console.log(SessionManager.Instnace().sessionList.length)
  var [isLogged, index] = SessionManager.Instnace().userIsLogged(user_email)
  if (!isLogged) return { status: -1, data: "user not logged" }
  var user_session = SessionManager.Instnace().getUserAt(index)
  console.log(token)
  var tokenIsValid = user_session.validateToken(token)
  if (!tokenIsValid) return { status: -1, data: "user token not mathed" }
  else return { status: 1, data: { userIndex: index } }
}
