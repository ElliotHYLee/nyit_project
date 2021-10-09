"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.findAll = void 0;
var ConnLog = require("./ConnLogSchema");
var mongoose = require("mongoose");
function findAll(a, b) {
    ConnLog.find()
        .then(function (items) {
        console.log(items);
        res.send(items);
    })
        .catch(function (err) { return console.log(err); });
}
exports.findAll = findAll;
function connect() {
    mongoose
        .connect("mongodb://admin:admin@mongo:27017", {
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 3000,
    })
        .then(function () { return console.log("MongoDB Connected"); })
        .catch(function (err) { return console.log(err); });
}
exports.connect = connect;
