import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { pool } from './db';
import { initDb } from './db/seed';
import authRoutes from './routes/auth';
import eventsRoutes from './routes/events';
import { swaggerSpec } from './swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Interactive Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/api/health', async (_req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW() as current_time');
    res.json({
      status: 'ok',
      service: 'Eventify Backend API',
      database: 'connected',
      db_time: dbRes.rows[0].current_time
    });
  } catch (err: any) {
    res.status(500).json({ status: 'error', database: 'disconnected', error: err.message });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);

// Root route redirects to Swagger UI
app.get('/', (_req, res) => {
  res.redirect('/api-docs');
});

// Initialize DB schema then start server
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Eventify Backend running at http://localhost:${PORT}`);
      console.log(`📚 Interactive Swagger API Docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
