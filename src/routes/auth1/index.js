const express = require('express')
const auth = express.Router() 
const jwt = require('jsonwebtoken')
const { getUserById, getAllUsers } = require('../../modules/users/GetUser');
const { updateUser, addUser, deleteUser } = require('../../modules/users/SetUser')
const bodyParser = require('body-parser')
auth.use(bodyParser.json())

auth.post('/login', (req, res) => {
	try{
		res.send(
			{
				token :jwt.sign({
					name:"nam",
					age:12
				},'dadad',{
					algorithm: "HS256",
					expiresIn: '1d',
				})
			}
		)
	} catch (error) {
	}
})
module.exports = auth