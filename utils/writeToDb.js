const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../db.json");

module.exports = async db => {
	fs.writeFile(dbPath, JSON.stringify(db), writeErr => {
		if (writeErr) {
			console.error("Error writing to the file:", writeErr);
		} else {
			console.log("Successfully updated the JSON file!");
		}
	});
};
