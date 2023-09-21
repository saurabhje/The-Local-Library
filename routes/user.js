const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");



router.get("/sign-up", userController.createUser);

router.post('/sign-up',  function(req,res, next){
  res.send('You are so cool');
});

module.exports = router;
