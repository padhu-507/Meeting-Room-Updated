const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "meetingroom",
  multipleStatements: true,
});

module.exports = mysqlConnection;
