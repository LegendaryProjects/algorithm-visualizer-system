import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import pool from '../config/db.js';

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');


export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const userCheck = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES ($1, $2, $3, 'learner')
       RETURNING id, username, email, role, created_at`,
      [username, email, passwordHash]
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id, username: newUser.rows[0].username, role: newUser.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const tokenHash = hashToken(token);
    await pool.query(
      `INSERT INTO user_sessions (user_id, refresh_token_hash, device_info, ip_address, expires_at)
       VALUES ($1, $2, $3, $4, NOW() + INTERVAL '24 hours')`,
      [newUser.rows[0].id, tokenHash, req.headers['user-agent'] || 'Unknown', req.ip]
    );

    res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const login = async (req, res) => {
  const { credential, password } = req.body;

  if (!credential || !password) {
    return res.status(400).json({ error: 'Username/email and password required.' });
  }

  try {
    const userQuery = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [credential]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = userQuery.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const tokenHash = hashToken(token);
    await pool.query(
      `INSERT INTO user_sessions (user_id, refresh_token_hash, device_info, ip_address, expires_at)
       VALUES ($1, $2, $3, $4, NOW() + INTERVAL '24 hours')`,
      [user.id, tokenHash, req.headers['user-agent'] || 'Unknown', req.ip]
    );

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getMe = async (req, res) => {
  try {
    const userQuery = await pool.query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ user: userQuery.rows[0] });
  } catch (error) {
    console.error('Session retrieval error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    const tokenHash = hashToken(token);
    await pool.query('DELETE FROM user_sessions WHERE refresh_token_hash = $1', [tokenHash]);
  }

  res.json({ message: 'Logged out successfully.' });
};