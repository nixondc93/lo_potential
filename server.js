var Express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var axios = require('axios');

var app = Express(); 
var port = process.env.PORT || 3000;

app.use(Express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile('/index.html');
});


app.post('/post', function(req, res){
    var data = req.body;
    axios.post('https://www.tapapp.com/1755417/LeadImport/NewForm.aspx', data)
    .then(function(response){
        res.send(201, null);
    })
    .catch(function(error){
        res.send(418, null);
    });
});


app.listen(port, function(){
    console.log('server running');
});