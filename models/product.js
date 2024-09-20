const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: { type: mongoose.Schema.Types.String, required: true },
	price: { type: mongoose.Schema.Types.Number, required: true }
});

module.exports = mongoose.model("Product", ProductSchema);
