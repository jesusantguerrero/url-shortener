
const express = require('express');
const app = express();
const dateHelper = require('./public/dateHelper')
const mongoose = require('mongoose')
const stringConn = ''
console.log(process.env.PRUEBA)
//const db = mongoose.connect(stringConn)

//config
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

// routes

app.get("/", function (req, res) {
  const example = new dateHelper('December 14, 2017');
  res.render('index', {example: JSON.stringify(example)});
});

app.get("/api/*", function (req, res) {
  let url = req.originalUrl.slice(5);
  if (/^https?:\/\/\w*\.\w*/.test(url.toString())){

    res.end(`${url} is a valid url thanks`);
  }
  res.end(`${url} this is an invalid url`);
});

var listener = app.listen(process.env.PORT || 3000, (res) => {
});


function addUrl(url) {
  const Urls = mongoose.model('Urls',{
    name: String,
    short: String
  })

  const newUrl = new Urls({name: 'https://google.com', short: '2354'})
  newUrl.save((err)=> {
    if (err)
      console.log(err)
    console.log('saved!')
  })
}
