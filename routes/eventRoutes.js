// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Defina as rotas de eventos
router.post('/', eventController.addEvent); // Adicionar evento
router.get('/', eventController.listEvents); // Listar eventos
router.put('/:id', eventController.editEvent); // Editar evento
router.delete('/:id', eventController.deleteEvent); // Remover evento

module.exports = router;