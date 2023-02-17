const mysql = require('mysql');


const connection = mysql.createConnection({
    host:'hackathonserver.cynr3skzai4u.ap-northeast-2.rds.amazonaws.com',
    user:'root',
    password:'00000000',
    port:'3306',
    database:'hackathondb'
});

connection.connect();

console.log("db연결 성공 성공");

module.exports = connection;
