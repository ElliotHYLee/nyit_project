"use strict";
var express = require("express");
var mongoose = require("mongoose");
var ConnLog = require("./DBBridge/Schemas");
var app = express();
app.use(express.urlencoded({ extended: false }));
// Connect to MongoDB
mongoose
    .connect("mongodb://admin:admin@mongo:27017", {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 3000,
})
    .then(function () { return console.log("MongoDB Connected"); })
    .catch(function (err) { return console.log(err); });
app.get("/", function (req, res) {
    console.log("am i here");
    ConnLog.find()
        .then(function (items) {
        console.log(items);
        res.send(items);
    })
        .catch(function (err) { return console.log(err); });
});
app.post("/item/add", function (req, res) {
    var x = req.socket.remoteAddress.toString();
    var ip = x.split(":")[3];
    console.log(ip);
    var rPort = req.socket.remotePort;
    var newItem = new ConnLog({
        ip: ip,
        port: rPort,
    });
    newItem.save().then(function (item) {
        console.log(item);
        res.send(item);
    });
});
var port = 3000;
app.listen(port, function () { return console.log("Server running..."); });
