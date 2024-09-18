const { validationResult, matchedData } = require("express-validator");
const db = require("../utils/readDb");
const writeToDb = require("../utils/writeToDb");
const { v4: uuidv4 } = require("uuid");

exports.getProducts = async (req, res) => {
	try {
		console.log(req.signedCookies.User);
		const {
			query: { filter, value }
		} = req;
		if (filter && value) {
			return res
				.status(200)
				.json(db.products.filter(product => product[filter].includes(value)));
		}
		res.status(200).json(db.products);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.getProduct = async (req, res) => {
	try {
		const { foundProductIndex } = req;
		res.status(200).json(db.products[foundProductIndex]);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.postProduct = async (req, res) => {
	try {
		const validationErrors = validationResult(req);
		const errors = validationErrors.errors.map((e, i) => {
			const key = `error_${i}`;
			return { [key]: e.msg };
		});
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(errors);
		}
		const data = matchedData(req);
		db.products.push({ id: uuidv4(), ...data });
		writeToDb(db);
		res.status(201).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.patchProduct = async (req, res) => {
	try {
		const { foundProductIndex } = req;
		const validationErrors = validationResult(req);
		const errors = validationErrors.errors.map((e, i) => {
			const key = `error_${i}`;
			return { [key]: e.msg };
		});
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(errors);
		}
		const data = matchedData(req);
		db.products[foundProductIndex] = { ...db.products[foundProductIndex], ...data };
		writeToDb(db);
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.putProduct = async (req, res) => {
	try {
		const { params, foundProductIndex } = req;
		const validationErrors = validationResult(req);
		const errors = validationErrors.errors.map((e, i) => {
			const key = `error_${i}`;
			return { [key]: e.msg };
		});

		if (!validationErrors.isEmpty()) {
			return res.status(400).json(errors);
		}
		const data = matchedData(req);
		db.products[foundProductIndex] = { id: params.id, ...data };
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const { params } = req;
		db.products = db.products.filter(product => product.id !== params.id);
		writeToDb(db);
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};
