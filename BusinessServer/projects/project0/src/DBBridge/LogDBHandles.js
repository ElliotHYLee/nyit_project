import { ConnLog } from "./Schemas"
const mongoose = require("mongoose")

export function connect2mdb() {
  mongoose
    .connect("mongodb://admin:admin@mongo:27017", {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 3000,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))
}

export async function findAll() {
  try {
    return await ConnLog.find()
  } catch (err) {
    console.log(err)
  }
}

export async function logConn(ip, port, accepted) {
  const newLog = new ConnLog({
    ip: ip,
    port: port,
    accept: accepted,
  })
  newLog.save().then((item) => {
    // console.log(item)
  })
}

export async function deleteAll() {
  mongoose.connection.db.dropCollection("connlogs", function (err, result) {
    console.log(err)
  })
}

export async function deleteByIP(ip) {
  ConnLog.deleteOne({ ip: ip }, (err) => {
    console.log(err)
  })
}
