const db = require("../utils/readDb");
const { validate } = require("uuid");

module.exports = (req, res, next) => {
	const { params } = req;
	if (!validate(params.id)) {
		return res.status(400).send("Invalid UUID");
	}
	let foundUser = db.users.findIndex(user => user.id === params.id);
	if (foundUser === -1) {
		return res.status(404).send("User not found");
	}

	req.foundUserIndex = foundUser;
	next();
};
