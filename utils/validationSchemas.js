exports.requiredUserValidations = {
	firstName: {
		exists: { errorMessage: "firstName is required" },
		isString: { errorMessage: "firstName must be a string" }
	},
	lastName: {
		exists: { errorMessage: "lastName is required" },
		isString: { errorMessage: "lastName  must be a string" }
	},
	username: {
		exists: { errorMessage: "username is required" },
		isString: { errorMessage: "username  must be a string" }
	},
	password: {
		exists: { errorMessage: "password is required" },
		isString: { errorMessage: "password  must be a string" }
	}
};

exports.optionalUserValidations = {
	firstName: {
		optional: true,
		isString: { errorMessage: "firstName must be a string" }
	},
	lastName: {
		optional: true,
		isString: { errorMessage: "lastName must be a string" }
	},
	username: {
		optional: true,
		isString: { errorMessage: "username  must be a string" }
	},
	password: {
		optional: true,
		isString: { errorMessage: "password  must be a string" }
	}
};

exports.requiredProductValidations = {
	name: {
		exists: { errorMessage: "name is required" },
		isString: { errorMessage: "name must be a string" }
	},
	price: {
		exists: { errorMessage: "price is required" },
		isInt: { errorMessage: "price must be an integer" }
	}
};

exports.optionalProductValidations = {
	name: {
		optional: true,
		isString: { errorMessage: "name must be a string" }
	},
	price: {
		optional: true,
		isInt: { errorMessage: "price must be an integer" }
	}
};

exports.authValidations = {
	username: {
		exists: { errorMessage: "username must exist" },
		isString: { errorMessage: "username must be a string" }
	},
	password: {
		exists: { errorMessage: "password must exist" },
		isString: { errorMessage: "password must be a string" }
	}
};
