const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relaciona com o criador do evento
}, {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

module.exports = mongoose.model("Event", eventSchema);
