import { TravelType } from "../../Session/UserSession"
import { TicketSchema } from "./TicketSchema"

const mongoose = require("mongoose")
var ticket_conn: any

export function connect2ticketdb() {
  try {
    ticket_conn = mongoose.createConnection(
      "mongodb://admin:admin@ticket_mongo:27017",
      {
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 3000,
      }
    )
    console.log("Ticket DB Connected")
  } catch (err) {
    console.log(err)
  }
}

export async function findTicketByEmail(email: string) {
  var x = ticket_conn.model("ticket", TicketSchema)
  var result = await x.find({ user_email: email })
  return result
}

export async function createNewTicket(travel: TravelType) {
  var TicketModel = ticket_conn.model("ticket", TicketSchema)
  const NewTicket = new TicketModel(travel)
  try {
    var result = await NewTicket.save()
    return result
  } catch (e) {
    console.log(e)
  }
}

export async function deleteAllTickets() {
  ticket_conn.model("ticket", TicketSchema)
  ticket_conn.dropCollection("ticket")
}
