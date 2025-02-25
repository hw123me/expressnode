const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/customerSchema");
var moment = require('moment')
var methodOverride = require('method-override')

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(methodOverride('_method'))

//routes----------------------
app.get('/', (req, res) => {
  User.find().then((result) => {
    res.render("index", { mytitle: "Index Page", arr: result, moment: moment })
  }).catch((err) => {
    console.log(err)
  });
})
app.get('/user/add.html', (req, res) => {
  res.render("user/add", {});
})

app.get('/edit/:id', (req, res) => {
  User.findById(req.params.id).then((result) => {
    res.render("user/edit", { customer: result });
  }).catch((err) => {
    console.log(err)
  })
})
//end routes----------------------------------

//get // post //put //delete
//details
app.get('/view/:id', (req, res) => {
  User.findById(req.params.id).then((result) => {
    res.render("user/view", { customer: result, moment: moment });
  }).catch((err) => {
    console.log(err)
  })
})
//delete
app.delete("/edit/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
    res.redirect("/");
  }).catch((err) => {
    console.log(err)
  });

});

//post create user
app.post('/user/add.html', (req, res) => {
  // const user = new User(req.body);
  User.create(req.body).then(result => {
    res.redirect("/");
  })
    .catch(err => {
      console.log(err);
    });
})

//post search
app.post('/search', (req, res) => {
  const searchText = req.body.searchText.trim()
  User.find({ $or: [{ firstName: searchText }, { lastName: searchText }] })
  .then((result) => {
    console.log(result);
    res.render("user/search", { arr: result, moment: moment });
  })
  .catch((err) => {
    console.log(err);
  });
})

//update
app.put("/edit/:id", (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    });

});




mongoose.connect("mongodb+srv://hw123me:Abd6298549@cluster0.jqvh0.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log(err);
  });

