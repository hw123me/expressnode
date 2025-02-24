const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  email : String,
  phone : String,
  age : String,
  country : String,
  gender : String
 
});
 
 
// Create a model based on that schema
const User = mongoose.model("customer", customerSchema);
 
 
// export the model
module.exports = User;