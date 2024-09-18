const express = require("express");
const routes = require("../routes");
const cookieParser = require("cookie-parser");
const loggingMiddleware = require("../middlewares/loggingMiddleware");
const app = express();
const port = 8080;

app.use(loggingMiddleware);
app.use(cookieParser("hello"));
app.use(express.json());
app.use(routes);

app.listen(8080, () => {
	console.log(`App listening on port ${port}`);
});

app.get("/", (req, res) => {
	res.cookie("User", "José", { maxAge: 1000 * 60 * 60 * 2, signed: true }).end();
});
