import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config(); // Load environment variables

// Konfigurasi koneksi database
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

// Buat koneksi database
const db = mysql.createPool(dbConfig); // Create a pool of connections

// Test connection (optional)
db.getConnection()
  .then(() => {
    console.log(`Connected to MySQL database: ${process.env.DB_NAME}`);
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });

// Fungsi untuk menjalankan migrasi dan seeder
export const run = async () => {
  try {
    const connection = await db.getConnection();

    // Cek apakah tabel Customer sudah ada
    const [rows] = await connection.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = '${process.env.DB_NAME}' 
      AND table_name = 'Customer'
    `);

    if (rows[0].count === 0) {
      // Jika tabel belum ada, jalankan migrasi dan seeder

      // Baca dan jalankan file migrasi
      const migration = fs.readFileSync("./migrations/create_customer_table.sql", "utf-8");
      await connection.query(migration);
      console.log("Table Customer created successfully");

      // Baca dan jalankan file seeder
      const seeder = fs.readFileSync("./seeders/seed_customer.sql", "utf-8");
      await connection.query(seeder);
      console.log("Customer data seeded successfully");
    } else {
      console.log("Table Customer already exists, skipping migration and seeding.");
    }

    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Error running migration or seeder:", error.message);
  }
};

export default db;
