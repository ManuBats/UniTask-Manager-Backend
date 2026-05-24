const prisma = require('../config/database');

const dashboard = async (usuarioId) => {
  const where = { id_usuario: usuarioId };

  const [totalCompletadas, totalPendientes, cursos] = await Promise.all([
    prisma.actividad.count({ where: { ...where, completada: 1 } }),
    prisma.actividad.count({ where: { ...where, completada: 0 } }),
    prisma.curso.findMany({
      where,
      include: {
        _count: { select: { actividads: true } },
        actividads: {
          where: { completada: 1 },
          select: { id: true },
        },
      },
      orderBy: { nombre: 'asc' },
    }),
  ]);

  const total = totalCompletadas + totalPendientes;
  const progreso = total > 0 ? Math.round((totalCompletadas / total) * 100) : 0;

  const cursosData = cursos.map((c) => ({
    id: c.id,
    nombre: c.nombre,
    color: c.color,
    totalActividades: c._count.actividads,
    completadas: c.actividads.length,
  }));

  const pendientesPorCurso = cursosData.map((c) => ({
    ...c,
    pendientes: c.totalActividades - c.completadas,
  }));

  const cursoTop = pendientesPorCurso
    .filter((c) => c.pendientes > 0)
    .sort((a, b) => b.pendientes - a.pendientes)[0] || null;

  return { progreso, completadas: totalCompletadas, pendientes: totalPendientes, total, cursoTop, cursos: cursosData };
};

module.exports = { dashboard };
