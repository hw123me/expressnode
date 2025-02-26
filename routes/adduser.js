const express = require('express')
const router = express.Router()
const User = require("../models/customerSchema");
var moment = require('moment')
const userController = require("../Controllers/userController")


router.get('', userController.user_add_get )

//post create user
  router.post('', userController.user_add_post)

  module.exports = router