const mysql = require('mysql2');

// DB Config
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'ig_clone',
  password: '15061992',
});

module.exports = pool.promise();
