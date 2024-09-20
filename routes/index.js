const { Router } = require("express");
const usersRouter = require("./userRoutes");
const productsRouter = require("./productRoutes");
const authRouter = require("./authRoutes");
const router = Router();

router.use(usersRouter, productsRouter, authRouter);

module.exports = router;
