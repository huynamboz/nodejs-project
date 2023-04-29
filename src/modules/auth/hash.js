const crypto = require('crypto');
function hashPasswordWithSalt(password, saltVal) {
	if(!saltVal){
		saltVal = crypto.randomBytes(16).toString('hex');
	}
	console.log("saltval",saltVal)
	const hashedPassword = crypto.pbkdf2Sync(password, saltVal, 1000, 64, 'sha512').toString('hex');
	return {
		password :hashedPassword, salt :saltVal};
}
module.exports = {
	hashPasswordWithSalt
};