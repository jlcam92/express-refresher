const { Router } = require("express");
const { checkSchema } = require("express-validator");
const router = Router();
const {
	getProducts,
	getProduct,
	postProduct,
	patchProduct,
	putProduct,
	deleteProduct
} = require("../controllers/products");
const findProductById = require("../middlewares/findProductById");
const {
	requiredProductValidations,
	optionalProductValidations
} = require("../utils/validationSchemas");

router
	.route("/products")
	.get(getProducts)
	.post(checkSchema(requiredProductValidations), postProduct)
	.all((req, res) => res.status(405).send("Method not allowed"));

router
	.route("/products/:id")
	.all(findProductById)
	.get(getProduct)
	.patch(checkSchema(optionalProductValidations), patchProduct)
	.put(checkSchema(requiredProductValidations), putProduct)
	.delete(deleteProduct)
	.all((req, res) => res.status(405).send("Method not allowed"));

module.exports = router;
