const db = require("../utils/readDb");
const { validate } = require("uuid");

module.exports = (req, res, next) => {
	const { params } = req;
	if (!validate(params.id)) {
		return res.status(400).send("Invalid UUID");
	}
	let foundProduct = db.products.findIndex(product => product.id === params.id);
	if (foundProduct === -1) {
		return res.status(404).send("Product not found");
	}

	req.foundProductIndex = foundProduct;
	next();
};
