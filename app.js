require("dotenv").config();
const createApp = require("./createApp");
const port = 8080;

(async () => {
	const app = await createApp(process.env.MONGODB_CONNECTION_STRING);
	// const app = await createApp(process.env.MONGODB_CONNECTION_STRING, { dbName: "test2" });
	app.listen(port, () => {
		console.log(`App listening on port ${port}`);
	});
})();
