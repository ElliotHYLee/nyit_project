"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackList = exports.ConnLog = void 0;
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
    accept: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.ConnLog = mongoose.model("connlog", ConnLogSchema);
var BlackListSchema = new Schema({
    ip: {
        type: String,
        required: true,
    },
});
exports.BlackList = mongoose.model("blacklist", BlackListSchema);
