const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',       // padrão do XAMPP
  password: process.env.DB_PASSWORD || '',   // vazio se não configurou senha
  database: process.env.DB_NAME || 'maieutike',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;