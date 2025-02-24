const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/customerSchema");

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
  User.find().then((result) => {
    res.render("index", { mytitle: "Index Page", arr: result })
  }).catch((err) => {
    console.log(err)
  });
})
app.get('/user/add.html', (req, res) => {
  res.render("user/add", {});
})
app.get('/user/view.html', (req, res) => {
  res.render("user/view", {});
})
app.get('/user/edit.html', (req, res) => {
  res.render("user/edit", {});
})

//post
app.post('/user/add.html', (req, res) => {
  const user = new User(req.body);
  user.save().then(result => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
  console.log(req.body)
})


// app.get('/index.html', (req, res) => {
//   res.send("<h1>تم ارسال البيانات بنجاح!</h1>")
// })


mongoose.connect("mongodb+srv://hw123me:Abd6298549@cluster0.jqvh0.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  console.log(req.body);
  const user = new Users(req.body);

  user.save().then(() => {
    res.redirect("/index.html");
  })
    .catch(err => {
      console.log(err);
    });
});
