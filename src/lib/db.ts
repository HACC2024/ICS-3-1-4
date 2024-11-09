import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function fetchDatasetNames() {
  const query = 'SELECT name FROM datasets';
  const res = await pool.query(query);
  return res.rows.map((row) => row.name);
}
