
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
    const data = addUrl(url).then((data) => {
      res.json(data);
    })
  } else {
    res.end(`${url} this is an invalid url`);
  }
});

app.get(':short', (req, res) => {
  UrlModel.$where('_id')
})

var listener = app.listen(process.env.PORT || 3000, (res) => {
});


function addUrl(url) {

  return UrlModel.create({original_url: url}, ((err, newUrl)=> {
    if (err)
      console.log(err)
    //const shorten_url = newUrl._id.slice(-6);
    //UrlModel.update({_id: newUrl._id}, {shorten_url: shorten_url})
    return newUrl
  }))
}
