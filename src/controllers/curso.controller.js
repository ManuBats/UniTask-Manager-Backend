const cursoService = require('../services/curso.service');
const { success } = require('../utils/response');

const listar = async (req, res) => {
  const cursos = await cursoService.listar(req.usuarioId);
  success(res, cursos);
};

const obtenerPorId = async (req, res) => {
  const curso = await cursoService.obtenerPorId(parseInt(req.params.id, 10), req.usuarioId);
  success(res, curso);
};

const crear = async (req, res) => {
  const curso = await cursoService.crear(req.body, req.usuarioId);
  success(res, curso, 201);
};

const actualizar = async (req, res) => {
  const curso = await cursoService.actualizar(parseInt(req.params.id, 10), req.body, req.usuarioId);
  success(res, curso);
};

const eliminar = async (req, res) => {
  await cursoService.eliminar(parseInt(req.params.id, 10), req.usuarioId);
  success(res, { mensaje: 'Curso eliminado correctamente' });
};

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
