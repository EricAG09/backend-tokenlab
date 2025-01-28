// controllers/eventController.js
const Event = require('../models/Event');

// Adicionar um evento
exports.addEvent = async (req, res) => {
    const { description, startTime, endTime } = req.body;

    try {
        const newEvent = new Event({ description, startTime, endTime });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao adicionar evento', details: error });
    }
};

// Listar eventos
exports.listEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar eventos', details: error });
    }
};

// Editar um evento
exports.editEvent = async (req, res) => {
    const { id } = req.params;
    const { description, startTime, endTime } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, { description, startTime, endTime }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao editar evento', details: error });
    }
};

// Remover um evento
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        res.status(200).json({ message: 'Evento removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover evento', details: error });
    }
};