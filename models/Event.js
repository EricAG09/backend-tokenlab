// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;