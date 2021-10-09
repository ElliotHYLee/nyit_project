"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var GQLTypes_1 = require("./GQLTypes");
var GQLResolvers_1 = require("./GQLResolvers");
var GQLApp = /** @class */ (function () {
    function GQLApp() {
        this.server = new graphql_yoga_1.GraphQLServer({
            typeDefs: GQLTypes_1.typeDefs,
            resolvers: GQLResolvers_1.resolvers,
            context: function (req) {
                console.log(req.request.socket.remoteAddress);
                throw new Error("Something bad happened");
                // try {
                //   throw new Error("Something bad happened")
                // } catch {}
            },
        });
    }
    GQLApp.prototype.runServer = function () {
        this.server.start({ port: 4000 }, function () {
            return console.log("Server is running on localhost:4000");
        });
    };
    return GQLApp;
}());
// const server = new GraphQLServer({
//   typeDefs,
//   resolvers,
//   context: (req) => {
//     console.log(req.request.socket.remoteAddress)
//     throw new Error("Something bad happened")
//     // try {
//     //   throw new Error("Something bad happened")
//     // } catch {}
//   },
// })
// server.start({ port: 4000 }, () =>
//   console.log("Server is running on localhost:4000")
// )
