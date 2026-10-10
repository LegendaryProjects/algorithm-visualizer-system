import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import algorithmRoutes from './routes/algorithms.js';

dotenv.config();

const app = express();
app.use((req, res, next) => { console.log("=>", req.method, req.url); next(); });
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api/algorithms', algorithmRoutes);

import progressRoutes from './routes/progressRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Periodic cleanup of expired sessions from user_sessions table
const cleanupExpiredSessions = async () => {
  try {
    const res = await pool.query("DELETE FROM user_sessions WHERE expires_at <= NOW() - INTERVAL '7 days'");
    if (res.rowCount > 0) {
      console.log(`[Sessions] Cleaned up ${res.rowCount} expired session(s)`);
    }
  } catch (err) {
    console.error('[Sessions] Error cleaning up expired sessions:', err);
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  cleanupExpiredSessions();
  // Run cleanup every 1 hour
  setInterval(cleanupExpiredSessions, 60 * 60 * 1000);
});
