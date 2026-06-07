// Initializes the database schema (and optionally seed data) using Node.
// No `psql` required. Works locally and on Render.
//
// Usage:
//   node server/scripts/initDb.js          -> creates tables only
//   node server/scripts/initDb.js --seed   -> creates tables + sample data
//
// Reads connection settings from environment variables (DATABASE_URL on Render).
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

async function run() {
  try {
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    console.log('Applying schema...');
    await pool.query(schemaSql);
    console.log('✅ Schema applied.');

    if (process.argv.includes('--seed')) {
      const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      console.log('Inserting seed data...');
      await pool.query(seedSql);
      console.log('✅ Seed data inserted.');
    }

    console.log('🎉 Database initialization complete.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    process.exit(1);
  }
}

run();
