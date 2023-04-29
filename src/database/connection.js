const mysql = require('mysql2')
console.log(process.env.HOST, process.env.USER, process.env.PASSWORD, process.env.DATABASE, process.env.PORT)
const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database:  process.env.DATABASE,
	port: process.env.PORT
})
module.exports = connection