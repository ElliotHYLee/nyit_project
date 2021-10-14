import {
  connect2busdb,
  findAllBus,
  findBusById,
  increaseBookedSeatsByBusId,
} from "./DBBridge/Bus/BUSDBHandle"

connect2busdb()

async function test0() {
  var allBus = await findAllBus()
  var bus_id = "2434d2"
  var theBus = await findBusById(bus_id)
  console.log(theBus)
  var x = await increaseBookedSeatsByBusId(bus_id, 1)
  console.log(x)
}

test0()
