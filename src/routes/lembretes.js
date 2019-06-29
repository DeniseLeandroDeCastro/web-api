const express = require('express');
const controller = require('../controller/lembrete');

const router = express.Router();

router.get('/lembretes/:id', controller.buscarUm);
router.get('/lembretes', controller.buscarTodos);
router.post('/lembretes', controller.criar);
router.put('/lembretes/:id', controller.atualizar);
router.delete('/lembretes/:id', controller.excluir);

module.exports = router;