"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseConfig = exports.opt = void 0;
var adminID = "admin";
var adminPW = "admin";
var port = "8080";
var serverAddr = "http://52.53.210.87:" + port + "/auth";
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