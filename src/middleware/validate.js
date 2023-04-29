const connection = require('../database/connection');
function validate(val,res, next){
	const regex =  /^[^\d\W_]+(?:\s[^\d\W_]+)*$/;
	if(val.name == undefined || val.name == "" || !regex.test(val.name)){
		return res.status(400).send("fullname is not valid :3")
	} 
	if(val.age == undefined || val.age == "" || val.age < 0){
		return res.status(400).send("age is not valid :3")
	}
	next()
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateRegisterRequest(req, res, next) {
    if (emailRegex.test(req.body.email) 
		&& req.body.name.length >= 2
		&& typeof req.body.gender == "boolean" 
		&& req.body.password.length >= 3 
		&& req.body.password == req.body.confirmPassword) {
		connection.query(`select * from user where email = ?`,[req.body.email],(error,results, field)=>{
			if(results.length > 0){
				console.log("exist");
				return res.status(400).json({message:"User is existed"})
			} else {
				return next();
			}
		})
    } else res.status(400).json({ message: 'Error validating' });
}
function validateLoginRequest(req,res,next){
	if(emailRegex.test(req.body.email) && req.body.password.length >=3){
		next()
	} else
	return res.status(400).json({message: 'Email or password not valid'})
}
module.exports = {validate,validateRegisterRequest,validateLoginRequest}