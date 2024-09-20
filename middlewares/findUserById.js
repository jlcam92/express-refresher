// const db = require("../utils/readDb");
// const validate = id => {
// 	// Check if the string is 32 characters long and only contains hex digits (0-9, a-f)
// 	const regex = /^[0-9a-f]{32}$/i;
// 	return regex.test(id);
// };

// module.exports = (req, res, next) => {
// 	const { params } = req;
// 	if (!validate(params.id)) {
// 		return res.status(400).send("Invalid UUID");
// 	}
// 	let foundUser = db.users.findIndex(user => user.id === params.id);
// 	if (foundUser === -1) {
// 		return res.status(404).send("User not found");
// 	}

// 	req.foundUserIndex = foundUser;
// 	next();
// };
