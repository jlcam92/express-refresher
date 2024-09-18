const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../db.json");
let db;

try {
	db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
} catch (e) {
	console.error(e);
}

module.exports = db;
