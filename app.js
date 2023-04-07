const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
let data = [
	{
		"id": 1,
		"fullname": "Nguyen Huy Tuong",
		"gender": true,
		"age": 18
	},
	{
		"id": 2,
		"fullname": "Nguyen Thi Tuong",
		"gender": false,
		"age": 15
	}
]
app.use(bodyParser.json())
app.get('/user', (req, res) => {
  res.send(data)
})
app.get('/user/:id', (req, res) => {
	const id = req.params.id
	const result = data.find(item => item.id === parseInt(id))
	if (!result) {
	  res.status(404).send('Record not found')
	} else {
	  res.send(result)
	}
  })
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
app.put('/user/:id', (req, res) => {
	const id = req.params.id
	const index = data.findIndex(item => item.id === parseInt(id))
	if (index === -1) {
	  res.status(404).send('Record not found')
	} else {
	  data[index].fullname = req.body.fullname || data[index].fullname
	  data[index].gender = req.body.gender || data[index].gender
	  data[index].age = req.body.age || data[index].age
	  res.send(data[index])
	}
  })
app.post('/user', (req, res) => {
	const user = {
			id : data[data.length - 1].id + 1,
			fullname : req.body.fullname,
			gender :req.body.gender,
			age : req.body.age
	}
	data.push(user)
	res.send(user)
})
app.delete('/user/:id', (req, res) => {
	const id = req.params.id
	const index = data.findIndex(item => item.id === parseInt(id))
	if (index === -1) {
		res.status(404).send('Record not found')
	} else {
		data.splice(index, 1)
		res.send(data)
	}
})
		
app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})