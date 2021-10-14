import { UserInfoSchema } from "./UserInfoSchema"
import { DummyUserInfo } from "./DummyUserInfo"

const mongoose = require("mongoose")
var userinfo_conn: any

export function connect2userinfodb() {
  try {
    userinfo_conn = mongoose.createConnection(
      "mongodb://admin:admin@userinfo_mongo:27017",
      {
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 3000,
      }
    )
    console.log("User Info DB Connected")
  } catch (err) {
    console.log(err)
  }
}

export async function findAllUserInfo() {
  try {
    var x = userinfo_conn.model("user_info", UserInfoSchema)
    return { status: "1", data: await x.find() }
  } catch (err) {
    console.log(err)
    return { status: "-1" }
  }
}

export async function findUserByEmail(email: string) {
  var x = userinfo_conn.model("user_info", UserInfoSchema)
  var result = await x.find({ user_email: email })
  return result
}

export async function createDummyUserInfo() {
  DummyUserInfo.forEach((userinfo) => {
    createNewUserInfo(userinfo)
  })
}

export async function createNewUserInfo(userinfo: any) {
  var UserInfoModel = userinfo_conn.model("user_info", UserInfoSchema)
  const NewUserInfo = new UserInfoModel(userinfo)
  try {
    var result = await NewUserInfo.save()
    console.log(result)
    return result
  } catch (e) {
    console.log(e)
    return e
  }
}

export async function deleteAllUserInfo() {
  userinfo_conn.model("user_info", UserInfoSchema)
  userinfo_conn.dropCollection("user_infos")
}
