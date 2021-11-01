import {
  getUserToken,
  createUserSession,
  validateRequestedUser,
} from "../UserSessionController"
import * as kc from "../Keycloak/Keycloak"
import { TravelType, UserInfoType } from "../../Session/UserSession"
import { createNewUserInfo } from "../../DBBridge/UserInfo/UserInfoDBHandle"
import { GQLDrain, GQLDrainError } from "./GQLExit"
import { SessionManager } from "../../Session/SessionMan"
import {
  createNewTicket,
  findTicketByEmail,
} from "../../DBBridge/Tickets/TicketHandle"
import {
  findAllBus,
  findBusById,
  increaseBookedSeatsByBusId,
} from "../../DBBridge/Bus/BUSDBHandle"

export async function loginProcess(root: any, args: any, context: any, info: any) {
  // get user token
  var result = await getUserToken(args)
  if (result.status == -1) return GQLDrainError()

  // create session
  await createUserSession(result.data.user_email, result.data.tokenPack)
  return GQLDrain(result.status, result.data.tokenPack)
}

export async function createNewUser(root: any, args: any, context: any, info: any) {
  console.log('create new user request being handled')
  var data_raw = args.data
  var data = JSON.parse(data_raw)
  console.log(data)

  // create keycloak id
  var res = await kc.createUser(data.user_email, data.pw)
  if (res.status == -1){ 
	console.log("err")
	return GQLDrainError()

}
  console.log("user created in KC")

  // get token from kc
  var result = await getUserToken(args)
  if (result.status == -1) return GQLDrainError()

  // save user_info to mongo
  var user_info: UserInfoType = {
    tokenPack: "", //result.data.tokenPack,
    user_email: data.user_email,
    user_first_name: data.user_first_name,
    user_last_name: data.user_last_name,
    user_card: data.card,
    user_card_name: data.user_card_name,
  }
  var xx = await createNewUserInfo(user_info)

  //create user session
  await createUserSession(result.data.user_email, result.data.tokenPack)
  return GQLDrain(1, result.data.tokenPack)
}

export async function bookNewTicket(root: any, args: any, context: any, info: any) {
  // check user token with the session
  // console.log("am i here")
  var data_raw = args.data
  // console.log(data_raw)
  var data = JSON.parse(data_raw)
  // console.log(data)

  // check user token with the session
  var isValid = validateRequestedUser(data.user_email, data.token)
  if (!isValid) return GQLDrainError()
  // console.log(isValid)

  // check total setas and booked seats
  // console.log(data.bus_id)
  var bus_id = data.bus_id
  var theBus = (await findBusById(bus_id))[0] // asssume only one
  // console.log(theBus)

  var total_seats = theBus.total_seats
  var booked_seats = theBus.booked_seats

  if (total_seats <= booked_seats) return GQLDrain(-1, "seat unavailable")

  // update bus ticket remaining number
  var x = await increaseBookedSeatsByBusId(bus_id, booked_seats + 1)
  // console.log(x)

  // create new plan for user.
  var travel: TravelType = {
    user_email: data.user_email,
    bus_id: bus_id,
    travel_duration: theBus.travel_duration,
    departure_city: theBus.departure_city,
    departure_date: theBus.departure_date,
    arrival_city: theBus.arrival_city,
    price: theBus.price,
  }

  var result = await createNewTicket(travel)
  // console.log("==========")
  // console.log(result)

  return GQLDrain(1, "ticket booked")
}

export async function getUserInfo(root: any, args: any, context: any, info: any) {
  console.log("am i here")
  var data_raw = args.data
  // console.log(data_raw)
  var data = JSON.parse(data_raw)
  // console.log(data)
  // check user token with the session
  var isValid = validateRequestedUser(data.user_email, data.token)
  if (!isValid) return GQLDrainError()
  console.log(isValid)
  // find user info from mongo
  var user_info: UserInfoType = JSON.parse(
    JSON.stringify(
      SessionManager.Instnace().getUserAt(isValid.data.userIndex).getUserInfo()
    )
  )
  console.log(user_info)

  // find the user's travel info from mongo
  var x = await findTicketByEmail(user_info.user_email)
  console.log(x)

  user_info.tokenPack = {}
  var data: any = { user_info: user_info, travels: x }

  // pack all and send
  return GQLDrain(1, data)
}

export async function getAllBusSchedules() {
  var allBusList = await findAllBus()
  return GQLDrain(1, allBusList)
}
