"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var typeDefs = "\n  type Query {\n    getId: String!\n  }\n  type Mutation {\n    addNum(value:String!): Boolean\n  }\n";
var x = "first value";
var resolvers = {
    Mutation: {
        addNum: function (_, args) {
            var temp = args.value;
            console.log(temp);
            x = temp;
            return true;
        },
    },
    Query: {
        getId: function () { return x; },
    },
};
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: function (req) {
        console.log(req.request.socket.remoteAddress);
        throw new Error("Something bad happened");
        // try {
        //   throw new Error("Something bad happened")
        // } catch {}
    },
});
server.start({ port: 4000 }, function () {
    return console.log("Server is running on localhost:4000");
});
