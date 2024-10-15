const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hashPassword = async password => {
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(password, salt);
};

exports.comparePassword = async (plain, hashed) => {
	console.log(await bcrypt.compare(plain, hashed));
	return await bcrypt.compare(plain, hashed);
};
