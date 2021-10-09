const express = require("express")
const mongoose = require("mongoose")
const ConnLog = require("./DBBridge/Schemas")

const app = express()
app.use(express.urlencoded({ extended: false }))

// Connect to MongoDB
mongoose
  .connect("mongodb://admin:admin@mongo:27017", {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 3000,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err))

app.get("/", (req, res) => {
  console.log("am i here")
  ConnLog.find()
    .then((items) => {
      console.log(items)
      res.send(items)
    })
    .catch((err) => console.log(err))
})

app.post("/item/add", (req, res) => {
  var x = req.socket.remoteAddress.toString()
  var ip = x.split(":")[3]
  console.log(ip)

  var rPort = req.socket.remotePort
  const newItem = new ConnLog({
    ip: ip,
    port: rPort,
  })
  newItem.save().then((item) => {
    console.log(item)
    res.send(item)
  })
})

const port = 3000

app.listen(port, () => console.log("Server running..."))
