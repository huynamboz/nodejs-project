function validate(val,res, next){
	const regex =  /^[a-zA-Z0-9\u00C0-\u1EF9\u1EA0-\u1EF1\u0300-\u036f~`!@#$%^&*()_+=\-{}\[\]\|:;"'<>,\.\?\/\\]+$/;
	if(val.fullname == undefined || val.fullname == "" || regex.test(val.fullname)){
		return res.status(400).send("fullname is not valid :3")
	} 
	if(val.age == undefined || val.age == "" || val.age < 0){
		return res.status(400).send("age is not valid :3")
	}
	if(typeof val.gender != 'boolean') {
		return res.status(400).send("gender is not valid :3")
	}
	next()
}
module.exports = validate