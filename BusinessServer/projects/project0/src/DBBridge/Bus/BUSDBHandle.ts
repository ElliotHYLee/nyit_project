import { BusSchema } from "./BusSchema"
import { DummyBusSchedules } from "./DummyBusSchedules"
const mongoose = require("mongoose")

var busdb_conn: any

export function connect2busdb() {
  try {
    busdb_conn = mongoose.createConnection("mongodb://admin:admin@bus_mongo:27017", {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 3000,
    })
    console.log("BUS DB Connected")
  } catch (err) {
    console.log(err)
  }
}

export async function findAllBus() {
  try {
    var x = busdb_conn.model("bus_schedule", BusSchema)
    return await x.find()
  } catch (err) {
    console.log(err)
  }
}

export async function findBusById(bus_id: string) {
  try {
    var x = busdb_conn.model("bus_schedule", BusSchema)
    return await x.find({ bus_id: bus_id })
  } catch (err) {
    console.log(err)
  }
}

export async function increaseBookedSeatsByBusId(bus_id: string, bs: number) {
  try {
    var x = busdb_conn.model("bus_schedule", BusSchema)
    return await x.findOneAndUpdate(
      { bus_id: bus_id },
      { booked_seats: bs },
      {
        new: true,
      }
    )
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function createDummySchedules() {
  DummyBusSchedules.forEach((schedule) => {
    createNewBusSchedule(schedule)
  })
}

export async function createNewBusSchedule(bus_info: any) {
  var BusSchedule = busdb_conn.model("bus_schedule", BusSchema)
  const newBusSchedule = new BusSchedule(bus_info)
  newBusSchedule.save().then((item: any) => {
    // console.log(item)
  })
}

export async function deleteAllBusSchedule() {
  busdb_conn.model("bus_schedule", BusSchema)
  busdb_conn.dropCollection("bus_schedules")
}
