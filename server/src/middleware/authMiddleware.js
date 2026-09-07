import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import pool from '../config/db.js';

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required.' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please sign in again.' });
    }
    return res.status(401).json({ error: 'Invalid access token. Please sign in again.' });
  }

  try {
    const tokenHash = hashToken(token);
    const sessionQuery = await pool.query(
      `SELECT id, user_id, device_info, ip_address, created_at, expires_at 
       FROM user_sessions 
       WHERE refresh_token_hash = $1`,
      [tokenHash]
    );

    if (sessionQuery.rows.length === 0) {
      return res.status(401).json({ error: 'Session has ended or was terminated. Please sign in again.' });
    }

    const session = sessionQuery.rows[0];

    // Check if session has expired past 24 hours or was ended on logout
    if (new Date(session.expires_at) <= new Date()) {
      return res.status(401).json({ error: 'Session expired after 24 hours. Please sign in again.' });
    }

    req.user = decoded;
    req.sessionId = session.id;
    req.sessionExpiresAt = session.expires_at;
    req.sessionDeviceInfo = session.device_info;
    req.sessionIpAddress = session.ip_address;
    req.token = token;
    req.tokenHash = tokenHash;

    next();
  } catch (error) {
    console.error('Session authentication error:', error);
    return res.status(500).json({ error: 'Internal server error verifying session.' });
  }
};