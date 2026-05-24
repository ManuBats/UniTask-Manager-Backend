const authService = require('../services/auth.service');
const { success } = require('../utils/response');

const register = async (req, res) => {
  const result = await authService.registrar(req.body);
  success(res, result, 201);
};

const login = async (req, res) => {
  const result = await authService.login(req.body);
  success(res, result);
};

const getProfile = async (req, res) => {
  const usuario = await authService.obtenerPerfil(req.usuarioId);
  success(res, usuario);
};

const updateProfile = async (req, res) => {
  const usuario = await authService.actualizarPerfil(req.usuarioId, req.body);
  success(res, usuario);
};

const changePassword = async (req, res) => {
  await authService.cambiarPassword(req.usuarioId, req.body);
  success(res, { mensaje: 'Contraseña actualizada correctamente' });
};

const logout = async (req, res) => {
  success(res, { mensaje: 'Sesión cerrada correctamente' });
};

module.exports = { register, login, getProfile, updateProfile, changePassword, logout };
