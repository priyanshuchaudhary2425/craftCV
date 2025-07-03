import pg from "pg";

const { Pool } = pg;

const db = new Pool(
    {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
);

db.connect()
.then(() => console.log("✅Connected to DB"))
.catch(() => console.log("❌ Error connecting to DB"));

export async function creatTables() {
    try {
        // Feedback table
        await db.query(`
            CREATE table if NOT EXISTS feedback (
                id SERIAL PRIMARY KEY,
                text not NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );`
        );

        // Usage table
        await db.query(`
            CREATE table if NOT EXISTS usageCount (
                id SERIAL PRIMARY KEY,
                usage INT not NULL DEFAULT 0
            );`
        );

        console.log("✅Table created or already exist...")
    } catch (err) {
        console.error("❌ Errorcreating table", err.stack);
    }
}

export { db };