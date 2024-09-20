require("dotenv").config();
require("./strategies/local-strategy");
const express = require("express");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const loggingMiddleware = require("./middlewares/loggingMiddleware");
const sessionLogger = require("./middlewares/sessionLogger");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const port = 8080;
(async () => {
	try {
		const app = express();
		app.use(loggingMiddleware);
		app.use(
			session({
				secret: process.env.SECRET,
				saveUninitialized: false,
				resave: false,
				cookie: { maxAge: 1000 * 60 * 60 * 2 }
			})
		);
		app.use(cookieParser("hello"));
		app.use(express.json());
		app.use(sessionLogger);
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(routes);

		app.get("/", (req, res) => {
			res.cookie("User", "José", { maxAge: 1000 * 60 * 60 * 2, signed: true }).end();
		});

		await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
		console.log("Connection to mongoDb successfully established");
		app.listen(8080, () => {
			console.log(`App listening on port ${port}`);
		});
	} catch (e) {
		console.error("Error initializing app", e);
	}
})();
