import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import pool from '../config/db.js';

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

export const parseDeviceInfo = (userAgent = '') => {
  if (!userAgent || typeof userAgent !== 'string') return 'Unknown Device';

  // 1. Detect OS
  let os = 'Unknown OS';
  if (/windows nt 10\.0/i.test(userAgent)) os = 'Windows 10/11';
  else if (/windows nt 6\.3/i.test(userAgent)) os = 'Windows 8.1';
  else if (/windows nt 6\.2/i.test(userAgent)) os = 'Windows 8';
  else if (/windows nt 6\.1/i.test(userAgent)) os = 'Windows 7';
  else if (/windows/i.test(userAgent)) os = 'Windows';
  else if (/iphone/i.test(userAgent)) os = 'iOS (iPhone)';
  else if (/ipad/i.test(userAgent)) os = 'iPadOS';
  else if (/macintosh|mac os x/i.test(userAgent)) os = 'macOS';
  else if (/android/i.test(userAgent)) os = 'Android';
  else if (/cros/i.test(userAgent)) os = 'ChromeOS';
  else if (/linux/i.test(userAgent)) os = 'Linux';

  // 2. Detect Browser (Order matters: Edge/Opera/Brave before Chrome, Chrome before Safari)
  let browser = 'Unknown Browser';
  if (/edg\//i.test(userAgent)) browser = 'Microsoft Edge';
  else if (/opr\/|opera/i.test(userAgent)) browser = 'Opera';
  else if (/brave/i.test(userAgent)) browser = 'Brave';
  else if (/chrome|crios/i.test(userAgent)) browser = 'Google Chrome';
  else if (/firefox|fxios/i.test(userAgent)) browser = 'Mozilla Firefox';
  else if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) browser = 'Apple Safari';
  else if (/msie|trident/i.test(userAgent)) browser = 'Internet Explorer';

  // 3. Detect Device Form Factor
  let deviceType = 'Desktop';
  if (/ipad|tablet/i.test(userAgent)) {
    deviceType = 'Tablet';
  } else if (/mobile|iphone|android.*mobile/i.test(userAgent)) {
    deviceType = 'Mobile';
  }

  return `${browser} on ${os} (${deviceType})`;
};


export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const assignedRole = role === 'admin' ? 'admin' : 'learner';

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
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role, created_at`,
      [username, email, passwordHash, assignedRole]
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id, username: newUser.rows[0].username, role: newUser.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const tokenHash = hashToken(token);
    const clientIp = (req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || '127.0.0.1').slice(0, 45);
    const deviceInfo = parseDeviceInfo(req.headers['user-agent']);

    const sessionRes = await pool.query(
      `INSERT INTO user_sessions (user_id, refresh_token_hash, device_info, ip_address, created_at, expires_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW() + INTERVAL '24 hours')
       RETURNING id, created_at, expires_at`,
      [newUser.rows[0].id, tokenHash, deviceInfo, clientIp]
    );

    res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: newUser.rows[0],
      session: {
        id: sessionRes.rows[0].id,
        createdAt: sessionRes.rows[0].created_at,
        expiresAt: sessionRes.rows[0].expires_at,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
};

export const login = async (req, res) => {
  const { credential, password, role } = req.body;

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

    if (role && user.role !== role) {
      const userRoleDisplay = user.role.charAt(0).toUpperCase() + user.role.slice(1);
      const targetRoleDisplay = role.charAt(0).toUpperCase() + role.slice(1);
      return res.status(403).json({ 
        error: `Account is registered as ${userRoleDisplay}, not ${targetRoleDisplay}. Please switch to the ${userRoleDisplay} tab.` 
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const tokenHash = hashToken(token);
    const clientIp = (req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || '127.0.0.1').slice(0, 45);
    const deviceInfo = parseDeviceInfo(req.headers['user-agent']);

    const sessionRes = await pool.query(
      `INSERT INTO user_sessions (user_id, refresh_token_hash, device_info, ip_address, created_at, expires_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW() + INTERVAL '24 hours')
       RETURNING id, created_at, expires_at`,
      [user.id, tokenHash, deviceInfo, clientIp]
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
      session: {
        id: sessionRes.rows[0].id,
        createdAt: sessionRes.rows[0].created_at,
        expiresAt: sessionRes.rows[0].expires_at,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
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

    res.json({ 
      user: userQuery.rows[0],
      session: {
        id: req.sessionId,
        expiresAt: req.sessionExpiresAt,
        deviceInfo: req.sessionDeviceInfo,
        ipAddress: req.sessionIpAddress,
      }
    });
  } catch (error) {
    console.error('Session retrieval error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
};

export const getUserSessions = async (req, res) => {
  try {
    const sessionsQuery = await pool.query(
      `SELECT id, device_info, ip_address, created_at, expires_at,
              (expires_at > NOW()) AS is_active,
              (id = $2) AS is_current
       FROM user_sessions
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id, req.sessionId]
    );

    res.json({ sessions: sessionsQuery.rows });
  } catch (error) {
    console.error('Get user sessions error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
};

export const logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (token) {
      const tokenHash = hashToken(token);
      // Mark the session as ended/expired at current timestamp
      // This records the session termination in the user_sessions table
      await pool.query(
        'UPDATE user_sessions SET expires_at = NOW() WHERE refresh_token_hash = $1',
        [tokenHash]
      );
    }
  } catch (error) {
    console.error('Logout error:', error);
  }

  res.json({ message: 'Logged out successfully. Session terminated.' });
};