const express = require("express");
const router = express.Router();
const { create , update,fetch} = require('../../controler/dashboardpage/companyinformation.route.jsx');



router.post("/addinfo", create);
router.post("/updateinfo", update);
router.get("/fetch", fetch);

module.exports = router;