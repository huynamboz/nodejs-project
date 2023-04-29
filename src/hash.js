const crypto = require('crypto');
function hashPassword(password) {
	const hashObject = crypto.createHash('sha512')
	const hashedPassword = hashObject
	.update(password)
	.digest('hex')
	return hashedPassword
};
//hash with salt
function hashPasswordWithSalt(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return hashedPassword;
}
console.log(hashPasswordWithSalt('12345'));