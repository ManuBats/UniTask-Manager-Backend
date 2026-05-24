const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema } = require('../validators/auth.validator');
const authController = require('../controllers/auth.controller');

router.post('/register', validate(registerSchema), asyncHandler(authController.register));
router.post('/login', validate(loginSchema), asyncHandler(authController.login));
router.get('/me', authMiddleware, asyncHandler(authController.getProfile));
router.put('/me', authMiddleware, validate(updateProfileSchema), asyncHandler(authController.updateProfile));
router.put('/password', authMiddleware, validate(changePasswordSchema), asyncHandler(authController.changePassword));
router.post('/logout', authMiddleware, asyncHandler(authController.logout));

module.exports = router;
