"use strict";
// import { Document, Model, Query, Schema, connect, model } from "mongoose"
// // 1. Create an interface representing a document in MongoDB.
// interface Log {
//   ip: string
//   port: string
//   date?: Date
// }
// // 2. Create a Schema corresponding to the document interface.
// const schema = new Schema<Log>({
//   ip: { type: String, required: true },
//   port: { type: String },
//   date: { type: Date, default: Date.now },
// })
// // 3. Create a Model.
// const UserModel = model<Log>("Log", schema)
// run()
//   .then(() => {
//     console.log("good")
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// export async function run(): Promise<void> {
//   // 4. Connect to MongoDB
//   await connect("mongodb://admin:admin@mongo:27017")
//   const doc = new UserModel({
//     ip: "0.0.0.0",
//     port: "8888",
//   })
//   await doc.save()
// }
// interface LogQueryHelpers {
//   byName(name: string): Query<any, Document<Log>> & LogQueryHelpers
// }
// schema.query.byName = function (name): Query<any, Document<Log>> & LogQueryHelpers {
//   return this.find({ name: name })
// }
// const LogModel = model<Log, Model<Log, LogQueryHelpers>>("Log", schema)
// export async function search(): Promise<void> {
//   await connect("mongodb://admin:admin@mongo:27017")
//   await LogModel.find().where("ip").gt("0.0.0.0") //.byName("mongoose")
//   //console.log(doc.email) // 'bill@initech.com'
// }
