const { validationResult, matchedData } = require("express-validator");
const Product = require("../models/product");
// const db = require("../utils/readDb");
// const writeToDb = require("../utils/writeToDb");
// const { v4: uuidv4 } = require("uuid");

exports.getProducts = async (req, res) => {
	try {
		// const {
		// 	query: { filter, value }
		// } = req;
		// if (filter && value) {
		// 	return res
		// 		.status(200)
		// 		.json(db.products.filter(product => product[filter].includes(value)));
		// }
		const products = await Product.find({}, { id: 0, __v: 0 });
		res.status(200).json(products);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.getProduct = async (req, res) => {
	try {
		// const { foundProductIndex } = req;
		// res.status(200).json(db.products[foundProductIndex]);
		res.status(200).json(await Product.findById(req.params.id));
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.postProduct = async (req, res) => {
	try {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array());
		}
		const data = matchedData(req);
		// db.products.push({ id: uuidv4(), ...data });
		// writeToDb(db);
		await Product.create(data);
		res.status(201).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.patchProduct = async (req, res) => {
	try {
		// const { foundProductIndex } = req;
		const validationErrors = validationResult(req);
		// const errors = validationErrors.errors.map((e, i) => {
		// 	const key = `error_${i}`;
		// 	return { [key]: e.msg };
		// });
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array());
		}
		const data = matchedData(req);
		// db.products[foundProductIndex] = { ...db.products[foundProductIndex], ...data };
		// writeToDb(db);
		await Product.updateOne({ _id: req.params.id }, { $set: { ...data } });
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.putProduct = async (req, res) => {
	try {
		// const { params, foundProductIndex } = req;
		const validationErrors = validationResult(req);
		// const errors = validationErrors.errors.map((e, i) => {
		// 	const key = `error_${i}`;
		// 	return { [key]: e.msg };
		// });

		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array());
		}
		const data = matchedData(req);
		// db.products[foundProductIndex] = { id: params.id, ...data };
		await Product.updateOne(
			{
				_id: req.params.id
			},
			{
				$set: {
					name: data.name,
					price: data.price
				}
			}
		);
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const { params } = req;
		// db.products = db.products.filter(product => product.id !== params.id);
		// writeToDb(db);
		await Product.deleteOne({ _id: params.id });
		res.status(204).end();
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};
