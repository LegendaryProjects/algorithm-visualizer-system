import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME,
});

async function run() {
  try {
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    console.log('Tables in', process.env.DB_NAME, ':', res.rows.map(r => r.table_name));
    
    // Also check if users table exists and its columns
    if (res.rows.find(r => r.table_name === 'users')) {
      const cols = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='users'");
      console.log('Users columns:', cols.rows);
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    pool.end();
  }
}
run();
