const express = require('express')
const router = express.Router()
const User = require("../models/customerSchema");
var moment = require('moment')
const userController = require("../Controllers/userController")

//home page
router.get('/', userController.user_index_get)
  
  
  router.get('/edit/:id', userController.user_edit_get)
  
  
  //details
  router.get('/view/:id', userController.user_details_get)

  //delete
  router.delete("/edit/:id", userController.user_delete );
  
  
  
  //post search
  router.post('/search', userController.user_search_post)
  
  //update
  router.put("/edit/:id", userController.user_edit_put);

module.exports = router