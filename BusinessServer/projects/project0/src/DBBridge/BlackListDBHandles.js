import { BlackList } from "./Schemas"
const mongoose = require("mongoose")

export function connect() {
  mongoose
    .connect("mongodb://admin:admin@mongo:27017", {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 3000,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))
}

export async function findAllBL() {
  try {
    return await BlackList.find()
  } catch (err) {
    console.log(err)
  }
}

export async function saveBlackList(ip) {
  const newBlackIP = new BlackList({
    ip: ip,
  })
  newBlackIP.save().then((item) => {
    console.log(item)
  })
}

export async function deleteAllBL() {
  mongoose.connection.db.dropCollection("blacklists", function (err, result) {
    console.log(err)
  })
}

export async function deleteByIP(ip) {
  BlackList.deleteOne({ ip: ip }, (err) => {
    console.log(err)
  })
}
