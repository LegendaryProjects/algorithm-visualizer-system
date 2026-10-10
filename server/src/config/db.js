import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isLocalhost = !process.env.DB_HOST || process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1';

const pool = new pg.Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'algorithm_visualizer_db',
  password: process.env.DB_PASSWORD || 'Sagar@2004',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  ssl: isLocalhost ? false : { rejectUnauthorized: false }
});

pool.on('error', (err) => {
  console.error('Unexpected database client error:', err);
  process.exit(-1);
});

export default pool;
