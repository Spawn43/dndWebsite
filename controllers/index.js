const router = require("express").Router();
const apiRoutes = require("./api");
const websiteRoutes = require("./website-routes.js");




router.use("/api", apiRoutes);
router.use("/", websiteRoutes);



router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;