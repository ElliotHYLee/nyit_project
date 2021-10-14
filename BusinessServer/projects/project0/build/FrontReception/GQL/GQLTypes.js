"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = "\n  type Query {\n    getId: String!\n    getBusInfo: String!   \n  }\n\n  type Mutation {\n    addNum(value:String!): Boolean\n    getUserToken(data:String!): String!\n    createNewUser(data:String!): String!\n    getUserInfo(data:String!): String!\n    bookNewTicket(data:String!): String!\n\n  }\n";
// bookNewTicket(data:String!): String!
