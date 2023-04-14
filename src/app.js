const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const validate = require('../middleware/validate')
const { getUserById, getAllUsers } = require('./modules/users/GetUser');
const { updateUser, addUser, deleteUser } = require('./modules/users/SetUser')

const port = 3001
app.use(bodyParser.json())
app.get('/user', async (req, res) => {
	res.send(await getAllUsers(req, res))
})

app.get('/user/:id', async (req, res) => {
	try {
		const result = await getUserById(req, res);
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.put('/user/:id', async (req, res) => {
	try {
		validate(req.body, res, next);
		const result = await updateUser(req, res);
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.post('/user', async (req, res) => {
	try {
		validate(req.body, res, next);
		const result = await addUser(req, res);
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.delete('/user/:id', async (req, res) => {
	try {
		const result = await deleteUser(req, res);
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});


app.listen(port, function () {
	console.log(`Example app listening on port ${port}`)
})