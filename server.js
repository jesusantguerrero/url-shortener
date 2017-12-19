
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
  const example = new dateHelper('December 14, 2017');
  res.render('index', {example: JSON.stringify(example)});
});

app.get('/api/*',(req, res) => {
  let url = req.originalUrl.slice(5);
  if (/^https?:\/\/\w*\.\w*/.test(url.toString())){
    addUrl(url).then((data) => {
      const datas = {
        original_url: data.original_url,
        shorten_url: `${req.baseUrl}${data._id.toString().slice(-6)}`
      };
      res.json(datas);
    })
  } else {
    res.end(`${url} this is an invalid url`);
  }
});

app.get('/:short', (req, res) => {
  getUrl(req.params.short).then((url) => {
    if (url) {
      res.redirect(url.original_url)
    } else {
      res.end('no conocemos esa url')
    }
  })
})

var listener = app.listen(process.env.PORT || 3000, (res) => {
});


function addUrl(url) {
  return UrlModel.create({original_url: url}, ((err, newUrl)=> {
    if (err)
      console.log(err)
    const shorten_url = newUrl._id.toString().slice(-6);
    return UrlModel.update({_id: newUrl._id},{ shorten_url: shorten_url},(err, data) => {
      if (err)
        console.log(err)
      return data
    })
  }))
}

function getUrl(short) {
  return UrlModel.findOne({shorten_url: short}, (err, res) => {
    if (err) 
      return false
    return res.original_url
  })
}
