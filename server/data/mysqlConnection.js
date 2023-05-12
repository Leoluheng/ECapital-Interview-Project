const mysql = require('mysql');

const dbConnection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'rootpassword',
    database: 'my_company'
});

module.exports = dbConnection;