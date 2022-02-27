const router = require("express").Router();
const tableRoutes = require("./table-routes");
const userRoutes = require("./user-routes");


router.use("/table", tableRoutes);
router.use("/user", userRoutes);

module.exports = router;