const express = require('express')
const router = express.Router()
const customerController = require("../Controllers/customerController")


router.get('', customerController.customer_add_get )

//post create user
  router.post('', customerController.customer_add_post)

  module.exports = router