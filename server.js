
const express = require('express');
const app = express();
const dateHelper = require('./public/dateHelper')

//config
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

// routes

app.get("/", function (req, res) {
  const example = new dateHelper('December 14, 2017');
  res.render('index', {example: JSON.stringify(example)});
});

app.get("/:date", function (req, res) {
  let date = req.params.date;
  if (/\d|$dddd/i.test(date.toString()))
    date = new dateHelper(date);
  res.json(date);
});

var listener = app.listen(process.env.PORT || 3000, (res) => {
});
