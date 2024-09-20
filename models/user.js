const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: { type: mongoose.Schema.Types.String, required: true },
	lastName: { type: mongoose.Schema.Types.String, required: true },
	username: { type: mongoose.Schema.Types.String, required: true, unique: true },
	password: { type: mongoose.Schema.Types.String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
