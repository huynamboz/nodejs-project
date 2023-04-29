const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const { hashPasswordWithSalt } = require('../modules/auth/hash');
const { signToken,authorize } = require('../modules/auth/jwt');
const {validateRegisterRequest,validateLoginRequest} = require('../middleware/validate')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/login',[validateLoginRequest], (req, res,next) => {
	connection.query('select * from user where email = ?',[req.body.email],(err,result,field)=>{
		if(result.length == 1){
			if (result[0].password == hashPasswordWithSalt(req.body.password,result[0].salt).password)
			{
				res.json({accessToken : signToken(result[0])})
			} else {
				res.status(401).json({message :'Email or password not correct'})
			}
		} else {
			res.status(400).json({message :'user not exist'})
		}
	})
})
router.post('/register',[validateRegisterRequest], (req, res,next) => {
	let user = req.body;
	let hashed = hashPasswordWithSalt(user.password,false);
	user.password = hashed.password;
	user.salt = hashed.salt;
	console.log(user);
	connection.query(`insert into user (name,email,password,salt) value (?,?,?,?)`,[user.name, user.email, user.password,user.salt], (error, results, fields) => {
			console.log(error,results);
			if(!error){
				res.send("Success")
			}
	})
})
module.exports = router;