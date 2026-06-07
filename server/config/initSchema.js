// Automatically initializes the database the first time the server starts.
// This means you do NOT need a paid Render Shell to set up tables.
// It is safe: it only creates tables + seed data if they don't already exist.
const fs = require('fs');
const path = require('path');
const db = require('./database');

async function ensureDatabase() {
  try {
    // Check if the core "users" table already exists.
    const check = await db.query("SELECT to_regclass('public.users') AS tbl");
    if (check.rows[0] && check.rows[0].tbl) {
      console.log('✅ Database already initialized — skipping setup.');
      return;
    }

    console.log('⏳ First run detected. Creating database schema...');
    const schema = fs.readFileSync(
      path.join(__dirname, '..', 'database', 'schema.sql'),
      'utf8'
    );
    await db.query(schema);
    console.log('✅ Schema created.');

    console.log('⏳ Inserting sample data...');
    const seed = fs.readFileSync(
      path.join(__dirname, '..', 'database', 'seed.sql'),
      'utf8'
    );
    await db.query(seed);
    console.log('✅ Sample data inserted.');
    console.log('🎉 Database initialization complete.');
  } catch (err) {
    // Don't crash the server if init fails — just log it so the API still runs.
    console.error('❌ Database auto-init error:', err.message);
  }
}

module.exports = { ensureDatabase };
