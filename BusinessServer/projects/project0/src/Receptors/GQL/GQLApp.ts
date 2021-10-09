import { GraphQLServer } from "graphql-yoga"
import { typeDefs } from "./GQLTypes"
import { resolvers } from "./GQLResolvers"
import * as ctrl from "../../Controller/MainController"

export class GQLApp {
  server: any
  constructor() {
    this.server = new GraphQLServer({
      typeDefs,
      resolvers,
      context: this.gqlMiddleware,
    })
  }

  async gqlMiddleware(req: any) {
    const [ip, port, good2go] = await ctrl.filterBadIP(req.request.socket)
    ctrl.logIP(ip, port, good2go)
    if (!good2go) throw new Error("Something bad happened")
  }

  public runServer() {
    this.server.start({ port: 4000 }, () =>
      console.log("Server is running on localhost:4000")
    )
  }
}
