// const { validationResult, matchedData } = require("express-validator");
// const db = require("../utils/readDb");

exports.login = async (req, res) => {
	try {
		res.status(200).send("Logged in");
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.logout = (req, res) => {
	try {
		if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
		req.logout(e => {
			if (e) res.status(500).json({ error: e.message });
			res.status(200).send("Logged out");
		});
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};
