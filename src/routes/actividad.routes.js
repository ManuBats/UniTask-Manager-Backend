const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const validate = require('../middleware/validate');
const { createActividadSchema, updateActividadSchema } = require('../validators/actividad.validator');
const actividadController = require('../controllers/actividad.controller');

router.get('/', authMiddleware, asyncHandler(actividadController.listar));
router.get('/counts', authMiddleware, asyncHandler(actividadController.contar));
router.post('/', authMiddleware, validate(createActividadSchema), asyncHandler(actividadController.crear));
router.patch('/:id', authMiddleware, validate(updateActividadSchema), asyncHandler(actividadController.actualizar));
router.delete('/:id', authMiddleware, asyncHandler(actividadController.eliminar));

module.exports = router;
