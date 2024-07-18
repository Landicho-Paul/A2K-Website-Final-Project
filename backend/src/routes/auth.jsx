const express = require("express");
const router = express.Router();
const { signup,login,log } = require('../controler/auth.route.jsx');

require("dotenv").config();
console.log(process.env.JWT_SECRE);

console.log('sign up function :', signup )

router.post("/log", signup);
router.post("/login", login);
router.post("/loginn", log);



module.exports = router;
