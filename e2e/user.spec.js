require("dotenv").config();
const request = require("supertest");
const createApp = require("../createApp");
const port = 8082;
const mongoose = require("mongoose");
let app, server;
beforeAll(async () => {
	app = await createApp(process.env.MONGODB_CONNECTION_STRING, { dbName: "test3" });
	server = app.listen(port, () => {
		console.log(`App listening on port ${port}`);
	});
});

describe("/users", () => {
	it("should create the user", async () => {
		const response = await request(app).post("/users").send({
			firstName: "John",
			lastName: "Doe",
			username: "jdoe",
			password: "contrasena123"
		});
		expect(response.status).toBe(201);
	});
	it("should return a 200 when logging in", async () => {
		const response = await request(app).post("/login").send({
			username: "jdoe",
			password: "contrasena123"
		});
		expect(response.status).toBe(200);
	});
});

afterAll(async () => {
	await server.close();
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
});
