const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/create",  userController.createUser_get);
router.post("/create", userController.createUser_post);


module.exports = router;
