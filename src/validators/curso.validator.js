const { body } = require('express-validator');

const createCursoSchema = [
  body('nombre').notEmpty().withMessage('El nombre del curso es obligatorio'),
  body('color').optional().matches(/^#[0-9A-Fa-f]{6}$/).withMessage('Color debe ser hexadecimal (#XXXXXX)'),
];

const updateCursoSchema = [
  body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('color').optional().matches(/^#[0-9A-Fa-f]{6}$/).withMessage('Color debe ser hexadecimal (#XXXXXX)'),
];

module.exports = { createCursoSchema, updateCursoSchema };
