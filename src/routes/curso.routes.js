const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const validate = require('../middleware/validate');
const { createCursoSchema, updateCursoSchema } = require('../validators/curso.validator');
const cursoController = require('../controllers/curso.controller');

router.get('/', authMiddleware, asyncHandler(cursoController.listar));
router.get('/:id', authMiddleware, asyncHandler(cursoController.obtenerPorId));
router.post('/', authMiddleware, validate(createCursoSchema), asyncHandler(cursoController.crear));
router.patch('/:id', authMiddleware, validate(updateCursoSchema), asyncHandler(cursoController.actualizar));
router.delete('/:id', authMiddleware, asyncHandler(cursoController.eliminar));

module.exports = router;
