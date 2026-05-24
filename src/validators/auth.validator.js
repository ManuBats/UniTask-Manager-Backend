const { body } = require('express-validator');

const registerSchema = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const loginSchema = [
  body('email').notEmpty().withMessage('El email es obligatorio'),
  body('contrasena').notEmpty().withMessage('La contraseña es obligatoria'),
];

const updateProfileSchema = [
  body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('email').optional().isEmail().withMessage('Email inválido'),
];

const changePasswordSchema = [
  body('contrasenaActual').notEmpty().withMessage('La contraseña actual es obligatoria'),
  body('contrasenaNueva').isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
];

module.exports = { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema };
