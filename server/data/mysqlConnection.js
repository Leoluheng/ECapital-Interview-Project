const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
    host: 'mysql-server',
    // port: 3306,
    user: 'root',
    password: 'root',
    database: 'my_company',
    connectionLimit: 10,
    waitForConnections: true
});

module.exports = dbConnection;