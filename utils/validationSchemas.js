exports.requiredUserValidations = {
	firstName: {
		exists: { errorMessage: "firstName is required" },
		isString: { errorMessage: "firstName must be a string" }
	},
	lastName: {
		exists: { errorMessage: "lastName is required" },
		isString: { errorMessage: "lastName  must be a string" }
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
