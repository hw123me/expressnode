const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }

}, { timestamps: true }
);


// Create a model based on that schema table name -> users
const user = mongoose.model("user", userSchema);


// export the model
module.exports = user;