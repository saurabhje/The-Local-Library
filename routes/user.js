const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/create",  userController.createUser_get);

router.post("/create", userController.createUser_post);

router.get("/login", userController.loginUser_get);

router.post("/login", userController.loginUser_post);

module.exports = router;
