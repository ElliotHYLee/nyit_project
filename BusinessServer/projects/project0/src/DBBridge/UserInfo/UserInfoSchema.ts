const mongoose = require("mongoose")
const Schema = mongoose.Schema

export const UserInfoSchema = new Schema({
  token: {
    type: String,
    required: false,
  },
  user_email: {
    type: String,
    required: true,
  },
  user_first_name: {
    type: String,
  },
  user_last_name: {
    type: String,
  },
  user_card: {
    type: Number,
    default: 999,
  },
  user_card_name: {
    type: String,
  },
})
