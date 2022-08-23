const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "meeting_room_booking",
  multipleStatements: true,
});

module.exports = mysqlConnection;
