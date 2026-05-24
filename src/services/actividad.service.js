const prisma = require('../config/database');

const listar = async (usuarioId, query) => {
  const where = { id_usuario: usuarioId };

  if (query.completada !== undefined) {
    where.completada = query.completada === 'true' ? 1 : 0;
  }

  if (query.id_curso !== undefined) {
    where.id_curso = parseInt(query.id_curso, 10);
  }

  if (query.prioridad !== undefined) {
    where.prioridad = parseInt(query.prioridad, 10);
  }

  if (query.fecha !== undefined) {
    where.fecha = query.fecha;
  }

  if (query.fechaInicio !== undefined || query.fechaFin !== undefined) {
    where.fecha = {};
    if (query.fechaInicio !== undefined) where.fecha.gte = query.fechaInicio;
    if (query.fechaFin !== undefined) where.fecha.lte = query.fechaFin;
  }

  const [field, dir] = (query.orderBy || 'fecha ASC').split(' ');
  const orderBy = { [field]: dir === 'DESC' ? 'desc' : 'asc' };

  return prisma.actividad.findMany({
    where,
    orderBy,
    take: query.limit ? parseInt(query.limit, 10) : undefined,
    include: { curso: true },
  });
};

const contar = async (usuarioId, query) => {
  const where = { id_usuario: usuarioId };

  if (query.id_curso !== undefined) {
    where.id_curso = parseInt(query.id_curso, 10);
  }

  const [completadas, pendientes] = await Promise.all([
    prisma.actividad.count({ where: { ...where, completada: 1 } }),
    prisma.actividad.count({ where: { ...where, completada: 0 } }),
  ]);

  return { completadas, pendientes };
};

const crear = async (data, usuarioId) => {
  return prisma.actividad.create({
    data: {
      id_curso: data.id_curso && data.id_curso !== -1 ? data.id_curso : null,
      titulo: data.titulo,
      tipo: data.tipo || null,
      fecha: data.fecha,
      hora: data.hora || null,
      prioridad: data.prioridad ?? 0,
      descripcion: data.descripcion || null,
      id_usuario: usuarioId,
    },
  });
};

const actualizar = async (id, data, usuarioId) => {
  const existing = await prisma.actividad.findFirst({
    where: { id, id_usuario: usuarioId },
  });

  if (!existing) {
    const error = new Error('Actividad no encontrada');
    error.status = 404;
    throw error;
  }

  const updateData = {};
  if (data.titulo !== undefined) updateData.titulo = data.titulo;
  if (data.tipo !== undefined) updateData.tipo = data.tipo;
  if (data.fecha !== undefined) updateData.fecha = data.fecha;
  if (data.hora !== undefined) updateData.hora = data.hora;
  if (data.prioridad !== undefined) updateData.prioridad = data.prioridad;
  if (data.descripcion !== undefined) updateData.descripcion = data.descripcion;
  if (data.completada !== undefined) updateData.completada = data.completada ? 1 : 0;
  if (data.id_curso !== undefined) {
    updateData.id_curso = data.id_curso && data.id_curso !== -1 ? data.id_curso : null;
  }

  return prisma.actividad.update({ where: { id }, data: updateData });
};

const eliminar = async (id, usuarioId) => {
  const existing = await prisma.actividad.findFirst({
    where: { id, id_usuario: usuarioId },
  });

  if (!existing) {
    const error = new Error('Actividad no encontrada');
    error.status = 404;
    throw error;
  }

  await prisma.actividad.delete({ where: { id } });
};

module.exports = { listar, contar, crear, actualizar, eliminar };
