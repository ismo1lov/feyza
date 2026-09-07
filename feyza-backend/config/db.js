const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const dbConfig = {
  host: process.env.MYSQL_HOST || process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQL_USER || process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQL_PASSWORD || process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || process.env.DB_NAME || 'landing_page_db',
  port: parseInt(process.env.MYSQL_PORT || process.env.MYSQLPORT || process.env.DB_PORT || 3306),
};

const useSSL = process.env.DB_SSL === 'true' || process.env.MYSQL_SSL === 'true' || process.env.DB_SSL_CA;
if (useSSL) {
  const caPath = process.env.DB_SSL_CA;
  dbConfig.ssl = {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
    ca: caPath ? fs.readFileSync(path.resolve(caPath)) : undefined,
  };
}

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
    console.log(`  Host: ${dbConfig.host}, DB: ${dbConfig.database}, SSL: ${useSSL}`);
  }
  return pool;
}

module.exports = { getPool };
