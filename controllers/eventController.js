const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const{title, description, date, startTime, endTime, location} = req.body;
    const userId = req.user;

    try {
        const event = new Event({ title, description, date, startTime, endTime, location, userId });
        await event.save();
        res.status(201).json({message: "Evento criado com sucesso"});
    } catch (error) {
        res.status(500).json({message: 'Erro ao criar evento', error});
    }
}

exports.getEvents = async (req, res) => {
    const userId = req.user.userId;

    try {
        const events = await Event.find({ user: userId });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: 'Erro ao buscar eventos', error});
    }
}

exports.getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id).populate("createdBy", "name email");

        if (!event) {
            return res.status(404).json({ message: "Evento não encontrado" });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar evento", error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, startTime, endTime, location } = req.body;
    const userId = req.user.userId;

    try {
        const event = await Event.findById(id);

        if(!event || event.user.toString() !== userId) {
            return res.status(404).json({message: "Evento não encontrado"});
        }

        event.title = title;
        event.description = description;
        event.date = date;
        event.startTime = startTime;
        event.endTime = endTime;
        event.location = location;

        await event.save();
        res.status(200).json({message: "Evento atualizado com sucesso"});
    } catch (error) {
        res.status(500).json({message: 'Erro ao atualizar evento', error});
    }
}

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const event = await Event.findById(id);

        if(!event || event.user.toString() !== userId) {
            return res.status(404).json({message: "Evento não encontrado"});
        }

        await event.remove();
        res.status(200).json({message: "Evento deletado com sucesso"});
    } catch (error) {
        res.status(500).json({message: 'Erro ao deletar evento', error});
    }
}