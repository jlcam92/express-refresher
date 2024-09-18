const { validationResult, matchedData } = require("express-validator");
const db = require("../utils/readDb");
const writeToDb = require("../utils/writeToDb");
const { v4: uuidv4 } = require("uuid");

exports.getUsers = async (req, res) => {
	try {
		const {
			query: { filter, value }
		} = req;
		if (filter && value) {
			return res.status(200).json(db.users.filter(user => user[filter].includes(value)));
		}
		res.status(200).json(db.users);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.getUser = async (req, res) => {
	try {
		const { foundUserIndex } = req;
		res.status(200).json(db.users[foundUserIndex]);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.postUser = async (req, res) => {
	try {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array());
		}
		const data = matchedData(req);
		db.users.push({ id: uuidv4(), ...data });
		writeToDb(db);
		res.status(201).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.patchUser = async (req, res) => {
	try {
		const { foundUserIndex } = req;
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array());
		}
		const data = matchedData(req);
		db.users[foundUserIndex] = { ...db.users[foundUserIndex], ...data };
		writeToDb(db);
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.putUser = async (req, res) => {
	try {
		const { params, foundUserIndex } = req;
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array());
		}
		const data = matchedData(req);
		db.users[foundUserIndex] = { id: params.id, ...data };
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const { params } = req;
		db.users = db.users.filter(user => user.id !== params.id);
		writeToDb(db);
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};
