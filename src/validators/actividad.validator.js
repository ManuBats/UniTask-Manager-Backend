const { body } = require('express-validator');

const createActividadSchema = [
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('fecha').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Fecha debe tener formato YYYY-MM-DD'),
  body('prioridad').optional().isInt({ min: 0, max: 2 }).withMessage('Prioridad debe ser 0, 1 o 2'),
  body('tipo').optional().isIn(['Tarea', 'Examen', 'Exposición']).withMessage('Tipo inválido'),
];

const updateActividadSchema = [
  body('titulo').optional().notEmpty().withMessage('El título no puede estar vacío'),
  body('fecha').optional().matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Fecha debe tener formato YYYY-MM-DD'),
  body('prioridad').optional().isInt({ min: 0, max: 2 }).withMessage('Prioridad debe ser 0, 1 o 2'),
];

module.exports = { createActividadSchema, updateActividadSchema };
