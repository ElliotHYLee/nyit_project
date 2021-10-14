import { ConnLog } from "./Schemas"
const mongoose = require("mongoose")

export function connect2mdb() {
  mongoose
    .connect("mongodb://admin:admin@connlog_mongo:27017", {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 3000,
    })
    .then(() => console.log("LogDB Connected"))
    .catch((err: any) => console.log(err))
}

export async function findAll() {
  try {
    return await ConnLog.find()
  } catch (err) {
    console.log(err)
  }
}

export async function logConn(ip: any, port: any, accepted: any) {
  const newLog = new ConnLog({
    ip: ip,
    port: port,
    accept: accepted,
  })
  newLog.save().then((item: any) => {
    // console.log(item)
  })
}

export async function deleteAll() {
  mongoose.connection.db.dropCollection(
    "connlogs",
    function (err: any, result: any) {
      console.log(err)
    }
  )
}

export async function deleteByIP(ip: any) {
  ConnLog.deleteOne({ ip: ip }, (err: any) => {
    console.log(err)
  })
}
