const express = require("express");
const router = express.Router();

const { registerUser, authUser } = require("../controllers/userControllers");

router.route("/signup").post(registerUser);
router.post("/login", authUser);

module.exports = router;
