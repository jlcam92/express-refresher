require("dotenv").config();
const request = require("supertest");
const createApp = require("../createApp");
const port = 8081;
const mongoose = require("mongoose");
let app, server;
beforeAll(async () => {
	app = await createApp(process.env.MONGODB_CONNECTION_STRING, { dbName: "test2" });
	server = app.listen(port, () => {
		console.log(`App listening on port ${port}`);
	});
});

describe("/users", () => {
	it("should return a 401 when trying to interact with a protected route while not logged in", async () => {
		const response = await request(app).patch(`/users/12334`, {});
		expect(response.status).toBe(401);
	});
});

afterAll(async () => {
	await server.close();
	await mongoose.connection.close();
});
