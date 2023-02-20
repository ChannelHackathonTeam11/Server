const mysql = require('mysql');
require('dotenv').config();  

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password:process.env.DATABASE_PASSWORD,
    port:'3306',
    database:'hackathondb'
});

connection.connect();

console.log("db연결 성공 성공");

module.exports = connection;
