"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoSchema = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.UserInfoSchema = new Schema({
    token: {
        type: String,
        required: false,
    },
    user_email: {
        type: String,
        required: true,
    },
    user_first_name: {
        type: String,
    },
    user_last_name: {
        type: String,
    },
    user_card: {
        type: Number,
        default: 999,
    },
    user_card_name: {
        type: String,
    },
});
