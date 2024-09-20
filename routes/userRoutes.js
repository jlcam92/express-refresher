const { Router } = require("express");
const { checkSchema } = require("express-validator");
const router = Router();
const isAuth = require("../middlewares/isAuth");
const {
	getUsers,
	getUser,
	postUser,
	patchUser,
	putUser,
	deleteUser
} = require("../controllers/users");
// const findUserById = require("../middlewares/findUserById");
const {
	requiredUserValidations,
	optionalUserValidations
} = require("../utils/validationSchemas");

router
	.route("/users")
	.get(getUsers)
	.post(checkSchema(requiredUserValidations), postUser)
	.all((req, res) => res.status(405).send("Method not allowed"));

router
	.route("/users/:id")
	// .all(findUserById)
	.get(getUser)
	.patch(checkSchema(optionalUserValidations), patchUser)
	.put(checkSchema(requiredUserValidations), putUser)
	.delete(deleteUser)
	.all((req, res) => res.status(405).send("Method not allowed"));

module.exports = router;
