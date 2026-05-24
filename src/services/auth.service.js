const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

const registrar = async ({ nombre, email, contrasena }) => {
  const existing = await prisma.usuario.findUnique({ where: { email } });
  if (existing) {
    const error = new Error('El email ya está registrado');
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(contrasena, 10);
  const usuario = await prisma.usuario.create({
    data: { nombre, email, contrasena: hashedPassword },
    select: { id: true, nombre: true, email: true },
  });

  const token = generarToken(usuario);
  return { token, usuario };
};

const login = async ({ email, contrasena }) => {
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!passwordMatch) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const token = generarToken(usuario);
  return {
    token,
    usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
  };
};

const obtenerPerfil = async (usuarioId) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: { id: true, nombre: true, email: true },
  });

  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }

  return usuario;
};

const actualizarPerfil = async (usuarioId, { nombre, email }) => {
  if (email) {
    const existing = await prisma.usuario.findUnique({ where: { email } });
    if (existing && existing.id !== usuarioId) {
      const error = new Error('El email ya está en uso');
      error.status = 409;
      throw error;
    }
  }

  const data = {};
  if (nombre !== undefined) data.nombre = nombre;
  if (email !== undefined) data.email = email;

  return prisma.usuario.update({
    where: { id: usuarioId },
    data,
    select: { id: true, nombre: true, email: true },
  });
};

const cambiarPassword = async (usuarioId, { contrasenaActual, contrasenaNueva }) => {
  const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });

  const passwordMatch = await bcrypt.compare(contrasenaActual, usuario.contrasena);
  if (!passwordMatch) {
    const error = new Error('La contraseña actual no es correcta');
    error.status = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(contrasenaNueva, 10);
  await prisma.usuario.update({
    where: { id: usuarioId },
    data: { contrasena: hashedPassword },
  });
};

module.exports = { registrar, login, obtenerPerfil, actualizarPerfil, cambiarPassword };
