require("./strategies/local-strategy");
const express = require("express");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const loggingMiddleware = require("./middlewares/loggingMiddleware");
const sessionLogger = require("./middlewares/sessionLogger");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

module.exports = (() => {
	return async (connectionString = "", mongooseOptions = {}) => {
		try {
			if (Object.keys(mongooseOptions).length > 0) {
				await mongoose.connect(connectionString, mongooseOptions);
			} else {
				await mongoose.connect(connectionString);
			}
			console.log("Connection to mongoDb successfully established");
			const app = express();
			app.use(loggingMiddleware);
			app.use(
				session({
					secret: process.env.SECRET,
					saveUninitialized: false,
					resave: false,
					cookie: { maxAge: 1000 * 60 * 60 * 2 },
					store: MongoStore.create({
						client: mongoose.connection.getClient()
					})
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

			return app;
		} catch (e) {
			console.error("Error initializing app", e);
		}
	};
})();
