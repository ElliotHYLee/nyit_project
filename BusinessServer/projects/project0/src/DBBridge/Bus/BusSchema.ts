const mongoose = require("mongoose")
const Schema = mongoose.Schema

export const BusSchema = new Schema({
  bus_id: {
    type: String,
    required: true,
  },
  total_seats: {
    type: Number,
  },
  booked_seats: {
    type: Number,
    default: 0,
  },
  travel_duration: {
    type: Number,
    default: 999,
  },
  departure_city: {
    type: String,
  },
  departure_date: {
    type: Date,
  },
  arrival_city: {
    type: String,
  },
  price: {
    type: Number,
    default: 99,
  },
})
