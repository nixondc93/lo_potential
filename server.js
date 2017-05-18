var Express = require('express');
var fs = require('fs');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var axios = require('axios');
var hbs = require('hbs');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var formData = require('./store/form.json');
var testData = require('./store/testform.json');
var userData = require('./store/user.json');

var app = Express(); 
var port = process.env.PORT || 3000;


app.set('view engine', "hbs"); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Express.static(__dirname + '/public'));


app.use(session({
  saveUninitialized: true,
  store: new FileStore(),
  resave: false,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60 * 60 * 1000 }
}));


app.get('/', function(req, res){
    console.log(req.session.email);
    res.render('index.hbs', testData);
});

app.get('/login', function(req, res){
    console.log(req.session.email);
    if(req.session.email){
        res.redirect('/update');
    }
    res.render('login.hbs');
});

app.get('/update', function(req, res){
    console.log(req.session.email);
    if(req.session.email){
        res.render('update.hbs', testData);     
    }else{
        res.redirect('/login');
    }
});

app.post('/update', function(req, res){
    console.log(req.session.email);
    var data = req.body; 
    var json = {
        "row_1": {
            "title": data.row_1_title[0],
            "column_1": data.row_1_column_1[0],
            "column_2": data.row_1_column_2[0],
            "column_3": data.row_1_column_3[0],
            "column_4": data.row_1_column_4[0]
        },
        "row_2": {    
            "title": data.row_2_title[0],
            "column_1": data.row_2_column_1[0],
            "column_2": data.row_2_column_2[0],
            "column_3": data.row_2_column_3[0],
            "column_4": data.row_2_column_4[0]
        },
        "row_3": {    
            "title": data.row_3_title[0],
            "column_1": data.row_3_column_1[0],
            "column_2": data.row_3_column_2[0],
            "column_3": data.row_3_column_3[0],
            "column_4": data.row_3_column_4[0]
        },
        "row_4": {    
            "title": data.row_4_title[0],
            "column_1": data.row_4_column_1[0],
            "column_2": data.row_4_column_2[0],
            "column_3": data.row_4_column_3[0],
            "column_4": data.row_4_column_4[0]
        },
        "row_5": {    
            "title": data.row_5_title[0],
            "column_1": data.row_5_column_1[0],
            "column_2": data.row_5_column_2[0],
            "column_3": data.row_5_column_3[0],
            "column_4": data.row_5_column_4[0]
        },
        "row_6": {    
            "title": data.row_6_title[0],
            "column_1": data.row_6_column_1[0],
            "column_2": data.row_6_column_2[0],
            "column_3": data.row_6_column_3[0],
            "column_4": data.row_6_column_4[0]
        },
        "row_7": {    
            "title": data.row_7_title[0],
            "column_1": data.row_7_column_1[0],
            "column_2": data.row_7_column_2[0],
            "column_3": data.row_7_column_3[0],
            "column_4": data.row_7_column_4[0]
        },
        "row_8": {    
            "title": data.row_8_title[0],
            "column_1": data.row_8_column_1[0],
            "column_2": data.row_8_column_2[0],
            "column_3": data.row_8_column_3[0],
            "column_4": data.row_8_column_4[0]
        }
    };

    function test(){
        
    }

    // new Promise (function(resolve, reject){
        fs.writeFile('./store/testform.json', JSON.stringify(json), function(err){
            if(err){
                // reject(err);  

            } else {
                // resolve(data);
                res.status(201).send('ok');
            }
        });
    // }).then(function(succ){
        
        // return; 
    // }).catch(function(err){
        // res.status(405).send(err);
        // return; 
    // });
});

app.post('/authenticate', function(req, res){
    var email = req.body.email;
    
    if(email !== userData.email){
        return res.redirect('/login');
    }

    // bcrypt.hash(req.body.password, 10, function(err, hash){
    bcrypt.compare(req.body.password, userData.password, function(err) {
        if(!err){ 
            req.session.email = email; 
            res.redirect('/update');
            res.end(); 
            return;
        }
        res.status(405).send(err);
    });
});

app.post('/post', function(req, res){
    var data = req.body;
    axios.post('https://www.tapapp.com/1755417/LeadImport/NewForm.aspx', data)
    .then(function(response){
        res.status(201);
    })
    .catch(function(error){
        res.status(418);
    });
});


app.listen(port, function(){
    console.log('server running');
});