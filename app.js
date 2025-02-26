const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/allRoutes')
const addUserRoute = require('./routes/adduser')
var methodOverride = require('method-override')

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(methodOverride('_method'))


mongoose.connect("mongodb+srv://hw123me:Abd6298549@cluster0.jqvh0.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log(err);
  });

  app.use(routes)
  app.use('/user/add.html',addUserRoute)

