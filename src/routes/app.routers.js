const { Router } = require("express");
const productRoutes = require("./products/products.routes");

const router = Router();

router.use("/products", productRoutes);

module.exports = router;

