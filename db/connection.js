const mysql = require("mysql2")

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: 'root',
    password: 'password',
    database: "employee_tracker",
  },
  console.log("connected to the nodejs_employee_tracker database")
)

module.exports = connection;