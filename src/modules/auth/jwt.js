const jwt = require('jsonwebtoken')
//render js object user
// const SECRECT = "secret"
// const user = {
// 	name: "John",
// 	age: 30,
// 	email: "example@gmail.com",
// 	phone: "0123456789"

// }

//create token
//make payload
// const payload = {
// 	name: user.name,
// 	age: user.age,
// 	email: user.email,
// 	phone: user.phone
// }
// const token = jwt.sign(payload,SECRECT,{
// 	algorithm: "HS256",
// 	expiresIn: '1d',
// 	issuer: "example.com",
// })
//checktoken valid
// const decoded = jwt.verify(token,SECRECT)
// console.log(decoded)
// console.log(token)
function signToken(user){
	return jwt.sign({
		id :user.id,
		name: user.name,
		email : user.email,
	},process.env.SECRECT, {
		algorithm: "HS256",
		expiresIn: "1d",
	})
}
function getInfoFromToken(req){
	try{
		let token = authHeader.split(' ')[1]
		const decode = jwt.verify(token, process.env.SECRECT)
		if( new Date.now() / 1000 > decode.expiresIn) return false
		return decode
	}	catch(e){
		return false
	}
}
function authorize(req,res,next){
	const authHeader = req.headers.authorization;
	console.log(authHeader)
	if( authHeader && authHeader.split(' ')[0] === 'Bearer'){
		try{
			const decode = jwt.verify(authHeader.split(' ')[1], process.env.SECRECT)
			console.log(Date.now() / 1000 , decode.exp)
			if( Date.now() / 1000 < decode.exp)
				{
					next();
				} else {
					return res.status(401).json({message :'Token is inspired'})
				}
		} catch(e){
			console.log("checktoken",e)
			return res.status(401).json({message :'Token not valid'})
		}
	} else return res.status(401).json({message :'Not have permission'})
}
module.exports = {
	signToken,
	authorize,
	getInfoFromToken
}