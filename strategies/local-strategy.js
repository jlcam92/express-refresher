const passport = require("passport");
const db = require("../utils/readDb");
const { Strategy } = require("passport-local");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	try {
		const user = db.users.find(user => user.id === id);
		if (!user) throw new Error("User not found");
		done(null, user);
	} catch (e) {
		done(e, null);
	}
});

module.exports = passport.use(
	new Strategy((username, password, done) => {
		try {
			const user = db.users.find(user => user.username === username);
			if (!user) throw new Error("User not found");
			if (user.password !== password) throw new Error("Incorrect password");
			done(null, user);
		} catch (e) {
			done(e, null);
		}
	})
);
