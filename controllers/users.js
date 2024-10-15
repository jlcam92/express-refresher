const { validationResult, matchedData } = require("express-validator");
const User = require("../models/user");
const { hashPassword } = require("../utils/helpers");
// const db = require("../utils/readDb");
// const writeToDb = require("../utils/writeToDb");
// const { v4: uuidv4 } = require("uuid");

exports.getUsers = async (req, res) => {
	try {
		// const {
		// 	query: { filter, value }
		// } = req;
		// if (filter && value) {
		// return res.status(200).json(db.users.filter(user => user[filter].includes(value)));
		// }
		const users = await User.find({}, { id: 0, __v: 0 });
		res.status(200).json(users);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.getUser = async (req, res) => {
	try {
		// const { foundUserIndex } = req;
		// res.status(200).json(db.users[foundUserIndex]);
		const user = await User.findById(req.params.id).select("-__v");
		if (!user) {
			return res.status(404).send("User not found");
		}
		res.status(200).json(user);
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
		// db.users.push({ id: uuidv4(), ...data });
		// writeToDb(db);
		const user = { ...data, password: await hashPassword(data.password) };
		await User.create(user);
		res.status(201).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.patchUser = async (req, res) => {
	try {
		// const { foundUserIndex } = req;
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array());
		}
		const data = matchedData(req);
		if (data.password) data.password = await hashPassword(data.password);
		await User.updateOne({ _id: req.params.id }, { $set: { ...data } });
		// db.users[foundUserIndex] = { ...db.users[foundUserIndex], ...data };
		// writeToDb(db);
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.putUser = async (req, res) => {
	try {
		// const { foundUserIndex } = req;
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array());
		}
		const data = matchedData(req);
		// db.users[foundUserIndex] = { id: params.id, ...data };
		await User.updateOne(
			{
				_id: req.params.id
			},
			{
				$set: {
					firstName: data.firstName,
					lastName: data.lastName,
					password: await hashPassword(data.password)
				}
			}
		);
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const { params } = req;
		// db.users = db.users.filter(user => user.id !== params.id);
		// writeToDb(db);
		await User.deleteOne({ _id: params.id });
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};
