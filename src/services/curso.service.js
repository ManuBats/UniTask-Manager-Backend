const prisma = require('../config/database');

const listar = async (usuarioId) => {
  const cursos = await prisma.curso.findMany({
    where: { id_usuario: usuarioId },
    orderBy: { nombre: 'asc' },
  });

  const result = cursos.map((c) => ({ ...c, pendientes: 0 }));

  if (cursos.length > 0) {
    const cursoIds = cursos.map((c) => c.id);

    const pendingCounts = await prisma.actividad.groupBy({
      by: ['id_curso'],
      where: {
        id_curso: { in: cursoIds },
        completada: 0,
      },
      _count: { id: true },
    });

    const pendingMap = {};
    pendingCounts.forEach((pc) => {
      if (pc.id_curso !== null) {
        pendingMap[pc.id_curso] = pc._count.id;
      }
    });

    result.forEach((c) => {
      c.pendientes = pendingMap[c.id] || 0;
    });
  }

  return result;
};

const obtenerPorId = async (id, usuarioId) => {
  const curso = await prisma.curso.findFirst({
    where: { id, id_usuario: usuarioId },
    include: { actividads: true },
  });

  if (!curso) {
    const error = new Error('Curso no encontrado');
    error.status = 404;
    throw error;
  }

  return curso;
};

const crear = async (data, usuarioId) => {
  return prisma.curso.create({
    data: {
      nombre: data.nombre,
      profesor: data.profesor || null,
      color: data.color || '#7C3AED',
      horario: data.horario || null,
      descripcion: data.descripcion || null,
      id_usuario: usuarioId,
    },
  });
};

const actualizar = async (id, data, usuarioId) => {
  const existing = await prisma.curso.findFirst({
    where: { id, id_usuario: usuarioId },
  });

  if (!existing) {
    const error = new Error('Curso no encontrado');
    error.status = 404;
    throw error;
  }

  const updateData = {};
  if (data.nombre !== undefined) updateData.nombre = data.nombre;
  if (data.profesor !== undefined) updateData.profesor = data.profesor;
  if (data.color !== undefined) updateData.color = data.color;
  if (data.horario !== undefined) updateData.horario = data.horario;
  if (data.descripcion !== undefined) updateData.descripcion = data.descripcion;

  return prisma.curso.update({ where: { id }, data: updateData });
};

const eliminar = async (id, usuarioId) => {
  const existing = await prisma.curso.findFirst({
    where: { id, id_usuario: usuarioId },
  });

  if (!existing) {
    const error = new Error('Curso no encontrado');
    error.status = 404;
    throw error;
  }

  await prisma.curso.delete({ where: { id } });
};

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
