"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var GQLDataMan_1 = require("./GQLDataMan");
exports.resolvers = {
    Mutation: {
        addNum: testFunction,
    },
    Query: {
        getId: function () { return GQLDataMan_1.GQLDataMan.Instance().test0; },
    },
};
function testFunction(_, args) {
    var temp = args.value;
    console.log(temp);
    GQLDataMan_1.GQLDataMan.Instance().test0 = temp;
    return true;
}
