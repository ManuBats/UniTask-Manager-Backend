const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/cursos', require('./curso.routes'));
router.use('/actividades', require('./actividad.routes'));
router.use('/stats', require('./stats.routes'));

module.exports = router;
