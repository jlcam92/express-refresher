const passport = require("passport");
// const db = require("../utils/readDb");
const { Strategy } = require("passport-local");
const User = require("../models/user");
const { comparePassword } = require("../utils/helpers");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		// const user = db.users.find(user => user.id === id);
		const user = await User.findById(id);
		if (!user) throw new Error("User not found");
		done(null, user);
	} catch (e) {
		done(e, null);
	}
});

module.exports = passport.use(
	new Strategy(async (username, password, done) => {
		try {
			// const user = db.users.find(user => user.username === username);
			const user = await User.findOne({ username });
			if (!user) throw new Error("User not found");
			console.log(password, user.password);
			const isValid = await comparePassword(password, user.password);
			if (!isValid) throw new Error("Incorrect password");
			done(null, user);
		} catch (e) {
			done(e, null);
		}
	})
);
