const actividadService = require('../services/actividad.service');
const { success } = require('../utils/response');

const listar = async (req, res) => {
  const actividades = await actividadService.listar(req.usuarioId, req.query);
  success(res, actividades);
};

const contar = async (req, res) => {
  const counts = await actividadService.contar(req.usuarioId, req.query);
  success(res, counts);
};

const crear = async (req, res) => {
  const actividad = await actividadService.crear(req.body, req.usuarioId);
  success(res, actividad, 201);
};

const actualizar = async (req, res) => {
  const actividad = await actividadService.actualizar(parseInt(req.params.id, 10), req.body, req.usuarioId);
  success(res, actividad);
};

const eliminar = async (req, res) => {
  await actividadService.eliminar(parseInt(req.params.id, 10), req.usuarioId);
  success(res, { mensaje: 'Actividad eliminada correctamente' });
};

module.exports = { listar, contar, crear, actualizar, eliminar };
