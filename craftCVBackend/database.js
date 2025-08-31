import pg from "pg";

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log("✅ Connected to DB"))
  .catch(() => console.log("❌ Error connecting to DB"));

export async function creatTables() {
  try {
    // Feedback table
    await db.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        feedbackText TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW()
      );`
    );

    // Usage table
    await db.query(`
      CREATE TABLE IF NOT EXISTS usageCount (
        id SERIAL PRIMARY KEY,
        usage INT NOT NULL DEFAULT 0
      );`
    );

    console.log("✅ Tables created or already exist...");

    // Initialize usageCount row
    const result = await db.query(`SELECT * FROM usageCount`);
    if (result.rowCount === 0) {
      await db.query(`INSERT INTO usageCount (usage) VALUES (105)`); // start from 105
      console.log("✅ Initialized usageCount to 105");
    } else {
      // Force bump to 105 if it's lower (only first deploy)
      await db.query(`UPDATE usageCount SET usage = 105 WHERE id = 1 AND usage < 105`);
    }
  } catch (err) {
    console.error("❌ Error creating table", err.stack);
  }
}

export async function incrementUsageCount() {
  await db.query(`UPDATE usageCount SET usage = usage + 1 WHERE id = 1`);
}

export async function getUsageCOunt() {
  const result = await db.query(`SELECT usage FROM usageCount WHERE id = 1`);
  return result.rows[0].usage;
}

export { db };
