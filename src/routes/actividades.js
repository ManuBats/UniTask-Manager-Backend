const express = require('express');
const prisma = require('../config/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/actividades?orderBy=...&limit=...&completada=...
router.get('/', authMiddleware, async (req, res) => {
  try {
    const where = {};

    if (req.query.completada !== undefined) {
      where.completada = req.query.completada === 'true' ? 1 : 0;
    }

    const orderBy = {};
    const [field, dir] = (req.query.orderBy || 'fecha ASC').split(' ');
    orderBy[field] = dir === 'DESC' ? 'desc' : 'asc';

    const actividades = await prisma.actividad.findMany({
      where,
      orderBy,
      take: req.query.limit ? parseInt(req.query.limit, 10) : undefined,
      include: { curso: true },
    });

    res.json(actividades);
  } catch (err) {
    console.error('Error al obtener actividades:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/actividades/counts
router.get('/counts', authMiddleware, async (req, res) => {
  try {
    const [completadas, pendientes] = await Promise.all([
      prisma.actividad.count({ where: { completada: 1 } }),
      prisma.actividad.count({ where: { completada: 0 } }),
    ]);

    res.json({ completadas, pendientes });
  } catch (err) {
    console.error('Error al obtener counts:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/actividades
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { id_curso, titulo, tipo, fecha, hora, prioridad, descripcion } = req.body;

    if (!titulo || !fecha) {
      return res.status(400).json({ error: 'Título y fecha son obligatorios' });
    }

    const actividad = await prisma.actividad.create({
      data: {
        id_curso: id_curso || null,
        titulo,
        tipo: tipo || null,
        fecha,
        hora: hora || null,
        prioridad: prioridad ?? 0,
        descripcion: descripcion || null,
      },
    });

    res.status(201).json(actividad);
  } catch (err) {
    console.error('Error al crear actividad:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PATCH /api/actividades/:id
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { titulo, tipo, fecha, hora, prioridad, descripcion, completada, id_curso } = req.body;

    const existing = await prisma.actividad.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    const data = {};
    if (titulo !== undefined) data.titulo = titulo;
    if (tipo !== undefined) data.tipo = tipo;
    if (fecha !== undefined) data.fecha = fecha;
    if (hora !== undefined) data.hora = hora;
    if (prioridad !== undefined) data.prioridad = prioridad;
    if (descripcion !== undefined) data.descripcion = descripcion;
    if (completada !== undefined) data.completada = completada ? 1 : 0;
    if (id_curso !== undefined) data.id_curso = id_curso;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'No hay campos para actualizar' });
    }

    const actividad = await prisma.actividad.update({
      where: { id },
      data,
    });

    res.json(actividad);
  } catch (err) {
    console.error('Error al actualizar actividad:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE /api/actividades/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const existing = await prisma.actividad.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    await prisma.actividad.delete({ where: { id } });
    res.json({ mensaje: 'Actividad eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar actividad:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
