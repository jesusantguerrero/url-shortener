
const express = require('express');
const app = express();
const dateHelper = require('./public/dateHelper')
const db = require('./models/db')
const UrlModel = require('./models/Url') 

//config
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

// routes
app.get('/', (req, res)=> {
  res.render('index');
});

app.get('/api/*',(req, res) => {
  let url = req.originalUrl.slice(5);
  if (UrlModel.isValid(url)){
    UrlModel.addUrl(url)
    .then((data) => {
      const datas = {
        original_url: data.original_url,
        shorten_url: `${req.hostname}/${data._id.toString().slice(-6)}` 
      };
      res.json(datas);
    })
  } else {
    res.json({
      error: `${url} is an invalid url`
    });
 }
});

app.get('/:short', (req, res) => {
  console.log(req.params.short)
  try {
    UrlModel.getUrl(req.params.short).then((url) => {
      if (url) { 
        res.redirect(url.original_url)
      } else {
        res.end('no conocemos esa url')
      }
    })
  } catch(err) {
    console.log(err)
  }
})

var listener = app.listen(process.env.PORT || 3000, (res) => {
});