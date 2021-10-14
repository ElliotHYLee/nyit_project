import { BlackList } from "./Schemas"
const mongoose = require("mongoose")

export function connect() {
  mongoose
    .connect("mongodb://admin:admin@connlog_mongo:27017", {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 3000,
    })
    .then(() => console.log("ConnLogDB Connected"))
    .catch((err: any) => console.log(err))
}

export async function findAllBL() {
  try {
    return await BlackList.find()
  } catch (err) {
    console.log(err)
  }
}

export async function saveBlackList(ip: string) {
  const newBlackIP = new BlackList({
    ip: ip,
  })
  newBlackIP.save().then((item: any) => {
    console.log(item)
  })
}

export async function deleteAllBL() {
  mongoose.connection.db.dropCollection(
    "blacklists",
    function (err: any, result: any) {
      console.log(err)
    }
  )
}

export async function deleteByIP(ip: any) {
  BlackList.deleteOne({ ip: ip }, (err: any) => {
    console.log(err)
  })
}
