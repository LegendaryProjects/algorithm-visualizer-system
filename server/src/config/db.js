import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isLocalhost = !process.env.DB_HOST || process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1' || process.env.DB_HOST === 'host.docker.internal';

let poolConfig = {};

if (process.env.DATABASE_URL) {
  // If the user provided a full Neon/Postgres connection string, use it directly!
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('sslmode=require') || !isLocalhost 
         ? { rejectUnauthorized: false } 
         : false
  };
} else {
  // Fallback to individual variables for local dev
  poolConfig = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'algorithm_visualizer_db',
    password: process.env.DB_PASSWORD || 'Sagar@2004',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    ...(process.env.DB_HOST && process.env.DB_HOST.includes('neon.tech') 
        ? { options: `endpoint=${process.env.DB_HOST.split('.')[0].replace('-pooler', '')}` } 
        : {}),
    ssl: isLocalhost ? false : { rejectUnauthorized: false }
  };
}

const pool = new pg.Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Unexpected database client error:', err);
  process.exit(-1);
});

export default pool;
