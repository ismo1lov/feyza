const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.MYSQL_HOST || process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQL_USER || process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQL_PASSWORD || process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || process.env.DB_NAME || 'landing_page_db',
  port: parseInt(process.env.MYSQL_PORT || process.env.MYSQLPORT || process.env.DB_PORT || 3306),
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
