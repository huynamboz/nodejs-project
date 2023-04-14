const mysql = require('mysql')
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Huynam@2003",
	database: "first",
	port: 3306
})
module.exports = connection