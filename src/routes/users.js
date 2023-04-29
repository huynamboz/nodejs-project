const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//user route
const user = express.Router() 
const {validate} = require('../middleware/validate')
const { getUserById, getAllUsers } = require('../modules/users/GetUser');
const { updateUser, addUser, deleteUser } = require('../modules/users/SetUser')
const { getInfoFromToken, authorize } = require('../modules/auth/jwt');

const port = 3001
app.use(bodyParser.json())
user.get('/user', async (req, res) => {
	res.send(await getAllUsers(req, res))
})	

user.get('/user/:id', async (req, res) => {
	try {
		const result = await getUserById(req, res);
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

user.put('/user/:id',[authorize], async (req, res,next) => {
	try {
		validate(req.body, res, next);
		let id = getInfoFromToken(req.headers.authorization)
		const result = await updateUser(req, res, id);
		res.status(200).json({data: result});
	} catch (error) {
		console.log(error);
	}
});

user.post('/user', async (req, res) => {
	try {
		validate(req.body, res, next);
		const result = await addUser(req, res);
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

user.delete('/user/:id', async (req, res) => {
	try {
		const result = await deleteUser(req, res);
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = user

