const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "db4free.net",
  user: "tatyqueen",
  password: "cristo16",
  database: "tddummydb",
  multipleStatements: true,
});

mysqlConnection.connect((error) => {
  if (error) throw error;
  console.log("Database server working awesomely perfect!");
});

module.exports = mysqlConnection;
