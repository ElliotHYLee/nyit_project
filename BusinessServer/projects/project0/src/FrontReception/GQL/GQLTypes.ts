export const typeDefs = `
  type Query {
    getId: String!
    getBusInfo: String!   
  }

  type Mutation {
    addNum(value:String!): Boolean
    getUserToken(data:String!): String!
    createNewUser(data:String!): String!
    getUserInfo(data:String!): String!
    bookNewTicket(data:String!): String!

  }
`

// bookNewTicket(data:String!): String!
