// const mysql = require('mysql2')
// const connection = require('./connection')
// connection.query('create table if not exists users (id int primary key auto_increment, name varchar(255), age int, check (age > 0))', (error, results, fields) => {
// 	console.log(results, error, "hihi");
// });
// connection.query(`insert into users (name, age) value(?,?)`,["nam","12"],  (error, results, fields) => {
// 	console.log(results,error,"hihi");
// })