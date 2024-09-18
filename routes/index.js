const { Router } = require("express");
const usersRouter = require("./userRoutes");
const productsRouter = require("./productRoutes");
const router = Router();

router.use(usersRouter, productsRouter);

module.exports = router;
