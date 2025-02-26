const Customer = require("../models/customerSchema");
var moment = require('moment')

//model_page_method
const customer_index_get = (req, res) => {
    Customer.find().then((result) => {
        res.render("index", { mytitle: "Index Page", arr: result, moment: moment })
    }).catch((err) => {
        console.log(err)
    });
}

const customer_edit_get = (req, res) => {
    Customer.findById(req.params.id).then((result) => {
        res.render("user/edit", { customer: result });
    }).catch((err) => {
        console.log(err)
    })
}

const customer_details_get = (req, res) => {
    Customer.findById(req.params.id).then((result) => {
        res.render("user/view", { customer: result, moment: moment });
    }).catch((err) => {
        console.log(err)
    })
}

const customer_delete = (req, res) => {
    Customer.deleteOne({ _id: req.params.id }).then((result) => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err)
    })
}

const customer_search_post = (req, res) => {
    const searchText = req.body.searchText.trim()
    Customer.find({ $or: [{ firstName: searchText }, { lastName: searchText }] })
        .then((result) => {
            res.render("user/search", { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        })
}
const customer_edit_put = (req, res) => {
    Customer.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.redirect("/");
        }).catch((err) => {
            console.log(err);
        })
}

const customer_add_get = (req, res) => {
    res.render("user/add", {});
}

const customer_add_post = (req, res) => {
    // const user = new User(req.body);
    Customer.create(req.body).then(result => {
        res.redirect("/");
    })
        .catch(err => {
            console.log(err);
        });
}
module.exports = { 
    customer_index_get, 
    customer_edit_get, 
    customer_details_get,
    customer_delete, 
     customer_search_post, 
     customer_edit_put, 
     customer_add_get, 
     customer_add_post
     }