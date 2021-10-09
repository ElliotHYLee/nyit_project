import { GQLDataMan } from "./GQLDataMan"

export const resolvers = {
  Mutation: {
    addNum: testFunction,
  },
  Query: {
    getId: () => GQLDataMan.Instance().test0,
  },
}

function testFunction(_: any, args: any) {
  var temp = args.value
  console.log(temp)
  GQLDataMan.Instance().test0 = temp
  return true
}
