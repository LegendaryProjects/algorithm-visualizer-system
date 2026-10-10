import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

console.log("Testing connection to:", process.env.DB_HOST);

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("Connection SUCCESS! Database time:", res.rows[0].now);
  } catch (err) {
    console.error("Connection FAILED!");
    console.error("Error Code:", err.code);
    console.error("Error Message:", err.message);
  } finally {
    pool.end();
  }
}
test();
