const express = require('express')
const router = express.Router()
const User = require("../models/customerSchema");
var moment = require('moment')
const customerController = require("../Controllers/customerController")
const loginController = require("../Controllers/loginController")


//home page
// router.get('/', userController.user_index_get)
router.get('/', customerController.customer_index_get)

//user auth------------------------
router.get('/login', loginController.user_login_get)
router.get('/register', loginController.user_register_get)
//post create user and login
  router.post('/user/register.html', loginController.user_register_post)
  router.post('/login', loginController.user_login_post)
  //-----------------------------------------------
  
  router.get('/edit/:id', customerController.customer_edit_get)
  
  
  //details
  router.get('/view/:id', customerController.customer_details_get)

  //delete
  router.delete("/edit/:id", customerController.customer_delete );
  
  
  
  //post search
  router.post('/search', customerController.customer_search_post)
  
  //update
  router.put("/edit/:id", customerController.customer_edit_put);

 
  

module.exports = router