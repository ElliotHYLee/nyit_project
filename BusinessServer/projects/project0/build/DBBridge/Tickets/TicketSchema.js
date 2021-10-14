"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketSchema = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.TicketSchema = new Schema({
    user_email: {
        type: String,
        required: true,
    },
    bus_id: { type: String },
    travel_duration: { type: Number },
    departure_city: { type: String },
    departure_date: { type: Date },
    arrival_city: { type: String },
    price: { type: Number },
});
