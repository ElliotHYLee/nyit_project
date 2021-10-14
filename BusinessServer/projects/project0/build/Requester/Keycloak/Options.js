"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseConfig = exports.opt = void 0;
var adminID = "superelliot";
var adminPW = "asdf";
var serverAddr = "http://54.176.129.155/auth";
exports.opt = {
    adminID: adminID,
    adminPW: adminPW,
    serverAddr: serverAddr,
};
exports.baseConfig = {
    method: "",
    url: "" + exports.opt.serverAddr,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {},
};
