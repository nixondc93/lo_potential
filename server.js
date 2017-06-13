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
    fs.readFile('./store/testform.json', 'utf8', function (err, data) {
        if (!err) {
            data = JSON.parse(data);
            res.render('test.hbs', data);
        } else {
            res.status(404).send("An Error Occured");
        }
    });
});

app.get('/info', function (req, res) {
    res.render('info.hbs');
});

app.get('/question/:number', function(req, res){
        fs.readFile('./store/testform.json', 'utf8', function (err, data) {
        if (!err) {
            data = JSON.parse(data);
            data = data['row_' + req.params.number];
            data.number = req.params.number; 
            res.render('questions.hbs', data); 
        } else {
            res.status(404).send("An Error Occured");
        }
    });
});

app.post('/question/:number', function(req, res){
    
    req.session['question_' + parseInt(req.params.number)] = {};
    req.session['question_' + parseInt(req.params.number)].score = req.body.score;
    req.session['question_' + parseInt(req.params.number)].goal = req.body.goal; 
    req.session['question_' + parseInt(req.params.number)].feedback = req.body.feedback;

    if(parseInt(req.params.number) === 8){
        res.redirect('/thank-you');
    }else{
        res.redirect('/question/' + (parseInt(req.params.number) + 1));
    } 
});

app.get('/thank-you', function(req, res){
    // axios.post('https://www.tapapp.com/1755417/LeadImport/NewForm.aspx', data)
    //     .then(function (response) {
    //         res.status(201).send('OK');
    //     })
    //     .catch(function (error) {
    //         res.status(418).send('Error: ' + error);
    //     });

    fs.readFile('./store/testform.json', 'utf8', function (err, data) {
        if (!err) {
            data = JSON.parse(data); 
            data.question_1 = req.session.question_1;
            data.question_2 = req.session.question_2;
            data.question_3 = req.session.question_3;
            data.question_4 = req.session.question_4;
            data.question_5 = req.session.question_5;
            data.question_6 = req.session.question_6;
            data.question_7 = req.session.question_7;
            data.question_8 = req.session.question_8;
            data.name = req.session.firstName + ' ' + req.session.lastName;
            data.scoreTotal = parseInt(req.session.question_1.score) + parseInt(req.session.question_2.score) + parseInt(req.session.question_3.score) + parseInt(req.session.question_4.score) + parseInt(req.session.question_5.score) + parseInt(req.session.question_6.score) + parseInt(req.session.question_7.score) + parseInt(req.session.question_8.score);
            data.goalTotal = parseInt(req.session.question_1.goal) + parseInt(req.session.question_2.goal) + parseInt(req.session.question_3.goal) + parseInt(req.session.question_4.goal) + parseInt(req.session.question_5.goal) + parseInt(req.session.question_6.goal) + parseInt(req.session.question_7.goal) + parseInt(req.session.question_8.goal);
            console.log(req.session);
            res.render('completed.hbs', data);
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
    console.log('body: ', req.body);
    req.session.firstName = req.body.firstName;
    req.session.lastName = req.body.lastName;
    req.session.userEmail = req.body.email;
    console.log('session: ',req.session)
    res.redirect('/question/1');
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
            } else {
                resolve();
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