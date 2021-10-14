import { GQLDataMan } from "./GQLDataMan"
import * as GQLCtrl from "../../Controller/FrontReception/GQLController"
export const resolvers = {
  Mutation: {
    addNum: testFunction,
    getUserToken: GQLCtrl.loginProcess, //expect id@ pw
    createNewUser: GQLCtrl.createNewUser,
    bookNewTicket: GQLCtrl.bookNewTicket,
    getUserInfo: GQLCtrl.getUserInfo,
  },
  Query: {
    getId: () => GQLDataMan.Instance().test0,
    getBusInfo: GQLCtrl.getAllBusSchedules,
  },
}

function testFunction(_: any, args: any) {
  var temp = args.value
  console.log(temp)
  GQLDataMan.Instance().test0 = temp
  return true
}
