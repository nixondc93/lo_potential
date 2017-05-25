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
var nodemailer = require('nodemailer');

var app = Express();
var port = process.env.PORT || 3000;


app.set('view engine', "hbs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(Express.static(__dirname + '/public'));

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'nixondc93@gmail.com',
//         pass: 'm8HY{>x8WVMyudemtx3UH/'
//     }
// });


app.use(session({
    saveUninitialized: true,
    store: new FileStore(),
    resave: false,
    secret: 'SuperSecretCookie',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));


app.get('/', function (req, res) {
    res.render('index.hbs');
});

app.get('/test', function (req, res) {
    fs.readFile('./store/testform.json', 'utf8', function (err, data) {
        if (!err) {
            data = JSON.parse(data);
            data.firstName = req.session.firstName;
            data.lastName = req.session.lastName;
            data.userEmail = req.session.userEmail;
            res.render('test.hbs', data);
        } else {
            res.status(404).send("An Error Occured");
        }
    });

});

app.get('/login', function (req, res) {
    if (req.session.email) {
        res.redirect('/update');
    } else {
        res.render('login.hbs');
    }
});

app.get('/update', function (req, res) {
    if (req.session.email) {
        fs.readFile('./store/testform.json', 'utf8', function (err, data) {
            if (!err) {
                res.render('update.hbs', JSON.parse(data));
            } else {
                res.status(404).send("An Error Occured");
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.post('/user-data', function (req, res) {
    req.session.firstName = req.body.firstName;
    req.session.lastName = req.body.lastName;
    req.session.userEmail = req.body.email;
    res.status(201).send("OK");
});

app.post('/update', function (req, res) {
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

    new Promise(function (resolve, reject) {
        fs.writeFile('./store/testform.json', JSON.stringify(json), function (err) {
            if (err) {
                reject(err);
                return;
            } else {
                return resolve();
            }
        });
    }).then(function (succ) {
        res.status(201).send(succ + "");
        return;
    }).catch(function (err) {
        res.status(405).send(err);
        return;
    });
});

app.post('/authenticate', function (req, res) {
    var email = req.body.email;

    if (email !== userData.email) {
        return res.redirect('/login');
    }

    bcrypt.compare(req.body.password, userData.password, function (err, data) {
        if (!err && data) {
            req.session.email = email;
            res.redirect('/update');
            res.end();
            return;
        } else {
            res.redirect('/login');
        }
    });
});



app.post('/post', function (req, res) {
    var data = req.body;

    // var mailOptions = {
    //     from: '"Ben Chenault" <nixondc93@gmail.com>', // sender address
    //     to: req.session.userEmail, // list of receivers
    //     subject: 'Loan Officer Potential ✔', // Subject line
    //     text: 'Hello world ?', // plain text body
    //     html: '<b>Hello world ?</b>' // html body
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //         console.log(error);
    //         // res.json({yo: 'error'});
    //     }else{
    //         console.log('Message sent: ' + info.response);
    //         // res.json({yo: info.response});
    //     }
    // });

    axios.post('https://www.tapapp.com/1755417/LeadImport/NewForm.aspx', data)
        .then(function (response) {
            res.status(201).send('OK');
        })
        .catch(function (error) {
            res.status(418).send('Error: ' + error);
        });
});


app.listen(port, function () {
    console.log('server running');
});