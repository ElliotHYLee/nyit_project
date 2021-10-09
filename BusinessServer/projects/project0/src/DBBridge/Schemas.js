const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ConnLogSchema = new Schema({
  ip: {
    type: String,
    required: true,
  },
  port: {
    type: String,
  },
  accept: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export const ConnLog = mongoose.model("connlog", ConnLogSchema)

const BlackListSchema = new Schema({
  ip: {
    type: String,
    required: true,
  },
})

export const BlackList = mongoose.model("blacklist", BlackListSchema)
