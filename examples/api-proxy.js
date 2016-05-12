var client = require('../lib')({
    consumerKey: '',
    consumerSecret: '',
    baseUrl: ''
});
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// routes
app.get('/search', function (req, res) {

  client.get('/jobinfo/search', {
   // oauth: false
  }, function(error, response, json){
      if (error || response.statusCode != 200) {
          console.log('Error', error || response.statusCode);
          return res.status(response.statusCode).send(response);
      }

      console.log('Search:', json.result);
      res.json(json.result);

  });

});

app.get('/', function(req, res){
    res.render('home');
})

app.listen(3005, function () {
  console.log('Example app listening on port 3000!');
});

