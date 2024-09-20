const { Router } = require("express");
const { checkSchema } = require("express-validator");
const router = Router();
const { authValidations } = require("../utils/validationSchemas");
const passport = require("passport");

router
	.route("/login")
	.post(checkSchema(authValidations), passport.authenticate("local"), (req, res) =>
		res.status(200).send("Logged in")
	)
	.all((req, res) => res.status(405).send("Method not allowed"));

module.exports = router;
