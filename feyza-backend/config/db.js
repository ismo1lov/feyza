const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'landing_page_db',
  port: parseInt(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
};

let pool;

async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("Ma'lumotlar bazasiga ulandik! 🗄️");
    console.log(`  Host: ${dbConfig.host}, DB: ${dbConfig.database}`);
  }
  return pool;
}

module.exports = { getPool };
