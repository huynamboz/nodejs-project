const connection = require('../../../database/connection')
async function getAllUsers() {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM users', (error, results, fields) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
}

async function getUserById(req, res) {
		return new Promise((resolve,reject) =>{
			const id = req.params.id
		connection.query(`SELECT * FROM users where id = ${id}`, (error, results, fields) => {
			console.log(results, error, "hihi");
			if (results.length === 0) {
				reject("Not found")
			} else
				resolve(results)
		});
		})
}
module.exports = {
	getAllUsers,
	getUserById
}