const { Router } = require("express");
const { checkSchema } = require("express-validator");
const router = Router();
const { authValidations } = require("../utils/validationSchemas");
const passport = require("passport");
const { logout, login } = require("../controllers/auth");

router
	.route("/login")
	.post(checkSchema(authValidations), passport.authenticate("local"), login)
	.all((req, res) => res.status(405).send("Method not allowed"));

router
	.route("/logout")
	.post(logout)
	.all((req, res) => res.status(405).send("Method not allowed"));

module.exports = router;
