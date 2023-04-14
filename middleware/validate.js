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
module.exports = validate