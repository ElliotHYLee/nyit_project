"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseConfig = exports.opt = void 0;
var adminID = "admin";
var adminPW = "admin";
var port = "8080";
var serverIP = "13.52.213.117";
var serverAddr = "http://13.52.213.117:" + port + "/auth";
exports.opt = {
    adminID: adminID,
    adminPW: adminPW,
    serverAddr: serverAddr,
    serverIP: serverIP,
};
exports.baseConfig = {
    method: "",
    url: "" + exports.opt.serverAddr,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {},
};
