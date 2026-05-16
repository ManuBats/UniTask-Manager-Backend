const express = require('express');
const prisma = require('../config/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/cursos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cursos = await prisma.curso.findMany({
      orderBy: { nombre: 'asc' },
    });
    res.json(cursos);
  } catch (err) {
    console.error('Error al obtener cursos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/cursos
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { nombre, profesor, color } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre del curso es obligatorio' });
    }

    const curso = await prisma.curso.create({
      data: {
        nombre,
        profesor: profesor || null,
        color: color || '#7C3AED',
      },
    });

    res.status(201).json(curso);
  } catch (err) {
    console.error('Error al crear curso:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE /api/cursos/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const existing = await prisma.curso.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    await prisma.curso.delete({ where: { id } });
    res.json({ mensaje: 'Curso eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar curso:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
