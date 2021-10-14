"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ConnLogSchema = new Schema({
    ip: {
        type: String,
        required: true,
    },
    port: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("connlog", ConnLogSchema);
