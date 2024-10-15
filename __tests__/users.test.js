require("dotenv").config();
const validator = require("express-validator");
const { validationResult, matchedData } = require("express-validator");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");
const { getUser, postUser } = require("../controllers/users");
const helpers = require("../utils/helpers");
jest.mock("express-validator", () => ({
	validationResult: jest.fn(() => ({
		isEmpty: jest.fn(() => false),
		array: jest.fn(() => [{ msg: "Invalid username" }])
	})),
	matchedData: jest.fn(() => ({
		firstName: "firstName",
		lastName: "lastName",
		username: "username",
		password: "password"
	}))
}));

jest.mock("../utils/helpers.js", () => ({
	hashPassword: jest.fn(password => `hashed_${password}`)
}));

jest.setTimeout(1000 * 30);

beforeAll(async () => await mongoose.connect(process.env.MONGODB_CONNECTION_STRING));

const mockRequest = {
	params: {
		id: "66edeca7c54ce301562bc9fb"
	}
};

const mockResponse = {
	status: jest.fn().mockReturnThis(),
	json: jest.fn(() => mockResponse),
	end: jest.fn()
};

describe("get users", () => {
	it("should get user by id", async () => {
		await getUser(mockRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalled();
		const userResponse = mockResponse.json.mock.calls[0][0];
		expect(userResponse._id.toString()).toBe("66edeca7c54ce301562bc9fb");
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledTimes(1);
	});

	it("should call status with 404 when user not found", async () => {
		const mockNotFoundRequest = {
			params: {
				id: "66edeca7c54ce301562bc9fc"
			}
		};
		await getUser(mockNotFoundRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledWith(404);
	});
});

describe("create users", () => {
	const mockRequest = {};

	jest.spyOn(User, "create").mockResolvedValue({ _id: "some_id" });

	it("should status of 400 when there are validation errors", async () => {
		await postUser(mockRequest, mockResponse);
		expect(validationResult).toHaveBeenCalledTimes(1);
		expect(validationResult).toHaveBeenCalledWith(mockRequest);
		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.json).toHaveBeenCalledWith([{ msg: "Invalid username" }]);
	});

	it("should return status 201", async () => {
		jest.spyOn(validator, "validationResult").mockImplementationOnce(() => {
			return {
				isEmpty: jest.fn(() => true)
			};
		});

		await postUser(mockRequest, mockResponse);
		expect(matchedData).toHaveBeenCalledWith(mockRequest);
		expect(helpers.hashPassword).toHaveBeenCalledWith("password");
		expect(helpers.hashPassword).toHaveReturnedWith("hashed_password");
		expect(User.create).toHaveBeenCalled();
		expect(User.create).toHaveBeenCalledWith({
			...matchedData(mockRequest),
			password: helpers.hashPassword(matchedData(mockRequest).password)
		});
		expect(mockResponse.status).toHaveBeenCalledWith(201);
		expect(mockResponse.end).toHaveBeenCalled();
	});

	it("should throw Error 500 if any error is thrown", async () => {
		jest.spyOn(validator, "validationResult").mockImplementationOnce(() => {
			return {
				isEmpty: jest.fn(() => true)
			};
		});

		jest
			.spyOn(User, "create")
			.mockImplementationOnce(() => Promise.reject("Failed to save"));

		await postUser(mockRequest, mockResponse);
		expect(matchedData).toHaveBeenCalledWith(mockRequest);
		expect(helpers.hashPassword).toHaveBeenCalledWith("password");
		expect(helpers.hashPassword).toHaveReturnedWith("hashed_password");
		expect(User.create).toHaveBeenCalled();
		expect(mockResponse.status).toHaveBeenCalledWith(500);
		expect(mockResponse.json).toHaveBeenCalled();
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
