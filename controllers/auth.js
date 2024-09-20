const { validationResult, matchedData } = require("express-validator");
const db = require("../utils/readDb");

exports.login = async (req, res) => {
	try {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array());
		}
		const data = matchedData(req);
		const user = db.users.find(user => user.username === data.username);
		if (!user) {
			return res.status(401).json({ message: "User does not exist" });
		}
		if (user.password !== data.password) {
			return res.status(401).json({ message: "Invalid password" });
		}

		req.session.user = user;
		res.status(200).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};
