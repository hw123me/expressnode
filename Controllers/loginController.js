const User = require("../models/userSchema");
const Customer = require("../models/customerSchema");
var moment = require('moment')
const bcryptjs = require('bcryptjs');
//get
const user_login_get = (req, res) => {
    res.render("login", {message : ''})
}
//post
const user_login_post = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
       // return res.send("User not found"); // Send message if user does not exist
         res.render("login", { message: "User not found" });
    }
    const passwordMatch = await bcryptjs.compare(req.body.password, user.password);

    if (passwordMatch) {
        if (user.role !== "admin") 
        {
            Customer.find().then((result) => {
               // res.render("index", { mytitle: "Index Page", arr: result, moment: moment })
                res.redirect("/")
            }).catch((err) => {
                console.log(err)
            });
        }else{
            res.render("adminhome")
        }
       
    } else {
        // res.send("Wrong password"); // Send message if password does not match
        res.render("login", { message: "Wrong password" });
    }


}

const user_register_get = (req, res) => {
    res.render("user/register", { message: '' })
}
const user_register_post = async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    const existingUser = await User.findOne({ name: req.body.name });
    const existingUserEmail = await User.findOne({ email: req.body.email });
    // const existingUser = User.find({ $or: [{ name: data.name }, { email: data.email }] })
    if (existingUser) {
        res.render("user/register", { message: "اسم المستخدم مسجل من قبل" });
    } else if (existingUserEmail) {
        res.render("user/register", { message: " البريد مسجل من قبل" });
    }
    else {
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(data.password, saltRounds);
        data.password = hashedPassword;
        User.create(data).then(result => {
            res.redirect("/");
        })
            .catch(err => {
                console.log(err);
            });
    }


}

module.exports = { user_login_get, user_register_get, user_register_post, user_login_post }