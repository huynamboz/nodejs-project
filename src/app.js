const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const user = require('./routes/users')
const auth = require('./routes/auth')
//user route
app.use(bodyParser.json())
app.use('/user', user)
app.use('/auth', auth)
const port = 3009
app.listen(port, function () {
	console.log(`Example app listening on port ${port}`)
})