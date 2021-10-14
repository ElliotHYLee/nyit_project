// import {
//   connect2userinfodb,
//   createDummyUserInfo,
//   deleteAllUserInfo,
//   findAllUserInfo,
//   findUserByEmail,
// } from "./DBBridge/UserInfo/UserInfoDBHandle"
// import { TravelType, UserInfoType } from "./Session/UserSession"
// import * as ticketAPI from "./DBBridge/Tickets/TicketHandle"
// import { SessionManager } from "./Session/SessionMan"

// ticketAPI.connect2ticketdb()
// connect2userinfodb()

// async function t0() {
//   await createDummyUserInfo()
// }

// // t0()

// async function zz() {
//   var x: TravelType = {
//     user_email: "user1@nyit.edu",
//     bus_id: "",
//     travel_duration: 0,
//     departure_city: "",
//     departure_date: new Date(2002, 1, 1),
//     arrival_city: "",
//     price: 0,
//   }
//   ticketAPI.createNewTicket(x)
// }

// // zz()

// async function foo() {
//   // user logs in and all other info is good

//   // get user info from mongo
//   var user_info_raw = (await findUserByEmail("user1@nyit.edu"))[0]

//   var user_info: UserInfoType = {
//     tokenPack: "token",
//     user_email: user_info_raw.user_email,
//     user_first_name: user_info_raw.user_first_name,
//     user_last_name: user_info_raw.user_last_name,
//     user_card: user_info_raw.user_card,
//     user_card_name: user_info_raw.user_card_name,
//   }
//   //   console.log(user_info)
//   // get user travels

//   var tickets = await ticketAPI.findTicketByEmail(user_info.user_email)

//   var travels: TravelType[] = []
//   tickets.forEach((ticket: any) => {
//     var travel: TravelType = {
//       user_email: ticket.user_email,
//       bus_id: ticket.bus_id,
//       travel_duration: ticket.travel_duration,
//       departure_city: ticket.departure_city,
//       departure_date: ticket.departure_date,
//       arrival_city: ticket.arrival_city,
//       price: ticket.price,
//     }
//     travels.push(travel)
//   })

//   //   console.log(travels)

//   SessionManager.Instnace().addNewUserSession(user_info, travels)
//   var x = SessionManager.Instnace().getUserAt(0)
//   console.log(x)
// }

// foo()
