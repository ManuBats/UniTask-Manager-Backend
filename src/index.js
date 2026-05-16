require('dotenv').config();

const express = require('express');
const cors = require('cors');
const prisma = require('./config/database');

const authRoutes = require('./routes/auth');
const cursosRoutes = require('./routes/cursos');
const actividadesRoutes = require('./routes/actividades');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/actividades', actividadesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`UniTask-Manager API running on http://0.0.0.0:${PORT}`);
});
