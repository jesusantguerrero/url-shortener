// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const dateHelper = require('./public/dateHelper')

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

app.get("/", function (req, res) {
  res.render('index');
});

app.get("/:date", function (req, res) {
  console.log(req.params.date);
  res.render('index');
});

// listen for requests :)
var listener = app.listen(process.env.PORT);
