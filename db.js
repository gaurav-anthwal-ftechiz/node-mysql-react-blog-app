const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "starter",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// pool.connect((err) => {
//   if (err) throw err;
//   console.log("db connected.");
// });

module.exports = pool;
