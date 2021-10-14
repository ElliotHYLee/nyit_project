"use strict";
// import * as ui_mongo from "../../../DBBridge/UserInfo/UserInfoDBHandle"
// import * as kc from "../../Keycloak/Keycloak"
// export async function createNewUser(user_info: any) {
//   // create user KC
//   var result = await kc.createUser(
//     "master",
//     user_info["user_email"],
//     user_info["user_pw"]
//   )
//   // create user info in userinfo_mongo
//   if (result == 1) {
//     var x = await ui_mongo.createNewUserInfo(user_info)
//     console.log("user create")
//   }
// }
// // only admin access
// export async function getUsers() {
//   // using user_info
//   var result = await ui_mongo.findAllUserInfo()
//   console.log(result)
//   // return
// }
// //export function updateUser(){}
// // only admin access
// export async function deleteUserByName() {}
// // only admin access
// export async function deleteAllUser() {
//   var result = await ui_mongo.deleteAllUserInfo()
//   console.log(result)
// }
