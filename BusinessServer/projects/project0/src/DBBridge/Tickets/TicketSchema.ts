const mongoose = require("mongoose")
const Schema = mongoose.Schema

export const TicketSchema = new Schema({
  user_email: {
    type: String,
    required: true,
  },
  bus_id: { type: String },
  travel_duration: { type: Number },
  departure_city: { type: String },
  departure_date: { type: Date },
  arrival_city: { type: String },
  price: { type: Number },
})
