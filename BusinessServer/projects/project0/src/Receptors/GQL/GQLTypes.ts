export const typeDefs = `
  type Query {
    getId: String!
  }
  type Mutation {
    addNum(value:String!): Boolean
  }
`
