const User = require("../models/customerSchema");
var moment = require('moment')

//model_page_method
const user_index_get = (req, res) => {
    User.find().then((result) => {
        res.render("index", { mytitle: "Index Page", arr: result, moment: moment })
    }).catch((err) => {
        console.log(err)
    });
}

const user_edit_get = (req, res) => {
    User.findById(req.params.id).then((result) => {
        res.render("user/edit", { customer: result });
    }).catch((err) => {
        console.log(err)
    })
}

const user_details_get = (req, res) => {
    User.findById(req.params.id).then((result) => {
        res.render("user/view", { customer: result, moment: moment });
    }).catch((err) => {
        console.log(err)
    })
}

const user_delete = (req, res) => {
    User.deleteOne({ _id: req.params.id }).then((result) => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err)
    })
}

const user_search_post = (req, res) => {
    const searchText = req.body.searchText.trim()
    User.find({ $or: [{ firstName: searchText }, { lastName: searchText }] })
        .then((result) => {
            console.log(result);
            res.render("user/search", { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        })
}
const user_edit_put = (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.redirect("/");
        }).catch((err) => {
            console.log(err);
        })
}

const user_add_get = (req, res) => {
    res.render("user/add", {});
}

const user_add_post = (req, res) => {
    // const user = new User(req.body);
    User.create(req.body).then(result => {
        res.redirect("/");
    })
        .catch(err => {
            console.log(err);
        });
}
module.exports = { 
    user_index_get, 
    user_edit_get, 
    user_details_get,
    user_delete, 
     user_search_post, 
     user_edit_put, 
     user_add_get, 
     user_add_post
     }