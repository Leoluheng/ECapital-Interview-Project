const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rootpassword',
    database: 'my_company',
    connectionLimit: 10,
    waitForConnections: true
});

module.exports = dbConnection;