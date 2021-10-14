"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var GQLDataMan_1 = require("./GQLDataMan");
var GQLCtrl = __importStar(require("../../Controller/FrontReception/GQLController"));
exports.resolvers = {
    Mutation: {
        addNum: testFunction,
        getUserToken: GQLCtrl.loginProcess,
        createNewUser: GQLCtrl.createNewUser,
        bookNewTicket: GQLCtrl.bookNewTicket,
        getUserInfo: GQLCtrl.getUserInfo,
    },
    Query: {
        getId: function () { return GQLDataMan_1.GQLDataMan.Instance().test0; },
        getBusInfo: GQLCtrl.getAllBusSchedules,
    },
};
function testFunction(_, args) {
    var temp = args.value;
    console.log(temp);
    GQLDataMan_1.GQLDataMan.Instance().test0 = temp;
    return true;
}
