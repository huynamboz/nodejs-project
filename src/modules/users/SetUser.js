const connection = require('../../database/connection')
const {getAllUsers} = require('./GetUser') 
function updateUser(req, res, id){
	return new Promise((resolve,reject)=>
	{
		connection.query(`select * from user where id = ?`,[id],(error,result) =>{
		console.log(error,result);
		if (result.length == 0) {
			reject("Not have user")
		} else {
			connection.query(`update users set name = ?,age = ? where id = ?`,[req.body.name,req.body.phone_number,id],
			(error,result)=>{
				if (error) {
					console.log("Error updating user:", error);
					reject(error)
				  } else {
					console.log("User updated successfully");
					resolve(result)
				  }
			})
		}
	})
	})
}
async function addUser(req,res){
	return new Promise((resolve,reject)=>{
			let users = getAllUsers()
			connection.query(`insert into users (name,age) values (?,?)`,[req.body.name,req.body.age],
			(error,result)=>{
				if (error) {
					console.log("Error updating user:", error);
					reject(error)
				  } else {
					console.log("User added successfully",result.insertId,"ok");
					resolve("Success -> userID is "+result.insertId)
				  }
			})
	})
}
async function deleteUser(req,res){
	return new Promise((resolve, reject)=>{
		connection.query(`delete from users where id = ?`,[req.params.id],
		(error,result)=>{
			if(error){
				reject(error)
			} else resolve("Delete successful")
		})
	})
}
module.exports = {
	updateUser,
	addUser,
	deleteUser
}