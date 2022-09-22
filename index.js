const mysql = require('mysql'),
    express = require('express'),
    session = require('express-session'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    port = (process.env.PORT || 3000),
    validator = require('validator'),
    helmet = require("helmet"),
    { XXHash32, XXHash64, XXHash3 } = require('xxhash-addon'),
    fs = require('fs');
app = express();

// Render chat
app.set('view engine', 'ejs')

app.use('/src', express.static(path.join(__dirname, 'src')))

server = app.listen(port, err => {
    err ?
        console.log("Error in server setup") :
        console.log(`Worker ${process.pid} started\nServeur lancer sur: http://localhost:${port}`);
});

const connection = mysql.createConnection({ //connection bdd
    host: 'mysql-casinosio.alwaysdata.net',
    user: 'casinosio',
    password: 'totoni13',
    database: 'casinosio_acc'
});


//SECURITER QUI BLOQUE TOUT:
/*
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "style-src": null,
            "img-src": ["'self'", "data: blob:"],
        },
    })
);*/
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Page web')));
app.disable('x-powered-by');
app.use(session({
    cookieName: 'session',
    secret: 'eg[isfd-8yF9-7wwzd2315df{}+Ijsli;;to8',
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    httpOnly: true,
    secure: true,
    ephemeral: true,
    resave: true,
    saveUninitialized: true
}));


// http://localhost:3000/
app.get('/', function (req, res) {
    res.render("accueil")
});


app.get('/login', function (req, res) {
    if (!req.session.loggedin) {
        res.render('login');
    } else {

    }
});
app.get('/create', function (req, res) {
    res.render("create")
});


app.get('/play', function (req, res) {

    res.render('game1');

});



function hash3(passwords) {

    const salute = `U@1${passwords}ds-`;
    const buf_salute = Buffer.from(salute);
    password = XXHash32.hash(buf_salute).toString('hex');
    return password;

}

app.get('/disco', function (req, res) {

    req.session.destroy();

    res.redirect("login")

})



app.post('/create', function (req, res) {

    let password = hash3(req.body.password);
    let username = validate(req.body.username);

    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password

        //INSERT INTO `accounts` (`id`, `username`, `password`, `highscore1`) VALUES (1, 'test', 'test', 0);

        connection.query(`INSERT INTO \`accounts\` (\`username\`,\`password\`) VALUES ('${username}', '${password}');`, [username, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) {
                console.log(error);
                return res.redirect("/login");
            }
            // If the account exists, redirect to the login page
            if (results.protocol41 == true) {
                req.session.loggedin = true;
                req.session.username = username;
                // rediction page play.
                res.redirect('/play');
            } else {
                res.redirect("/create")
            }
            res.end();
        });





    } else {
        res.redirect("/503")
    }
});

app.post('/updatepass', function (req, res) {

    let username = validate(req.body.username);
    let password = hash3(req.body.password);

    if (typeof username != "string" || (password).lastIndexOf("DROP") != -1) {
        res.send("Paramètre invalide");
        res.end();
        return;
    }

    connection.query(`UPDATE accounts SET password=\'${password}\' WHERE username =\'${username}\';`, function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) {
            console.log(error);
            return res.redirect("/login");
        }
        // If the account exists

        if (results.protocol41 == true) {

        } else {
            res.redirect("/manage")
        }
        res.end();
    });

});

app.get('/updatepass', function (req, res) {

    if (req.session.loggedin) {

        res.sendFile(path.join(__dirname + '/Page web/manage.html'));

    } else {
        // Render login template
        res.redirect('/login')
    }
});

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function validate(string) {
    return validator.escape(string);
}


app.post('/auth', function (req, res) {
    let password = hash3(req.body.password);
    let username = validate(req.body.username);

    console.log("pass " + password);
    console.log("user " + username);

    if (username && password || username != undefined || password != undefined) {
        connection.query(`SELECT * FROM accounts WHERE username = '${username}' AND password = '${password}'`, function (error, results, fields) {
            if (error) {
                console.log(error);
                return res.redirect("/login");
            }
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                // rediction page play.
                res.redirect('/play');
            } else {
                console.log("tome")
                res.send("Mauvais Nom d'utlisateur et/ou mauvais mot de passe<br>");
            }
            res.end();
        });
    } else {
        res.send("Veuillez rentrer un Nom d'utlisateur et mot de passe<br>");
        res.end();
    }



});





app.post('/updatepass', function (req, res) {

    let username = validate(req.body.username);
    let password = hash3(req.body.password);



    if (typeof username != "string" || (password).lastIndexOf("DROP") != -1) {
        res.send("Paramètre invalide");
        res.end();
        return;
    }


    connection.query(`UPDATE accounts SET password=\'${password}\' WHERE username =\'${username}\';`, function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) {
            console.log(error);
            return res.status(500).json(error);
        }
        // If the account exists

        if (results.protocol41 == true) {

        } else {
            res.redirect("/manage")
        }
        res.end();
    });

});

app.delete('/deleteaccount', function (req, res) {

    let username = validate(req.body.username);
    let password = hash3(req.body.password);
    console.log("deleteaccount : " + username + "   " + password)
    if (username && password || username != undefined || password != undefined) {
        connection.query(`SELECT * FROM accounts WHERE username = '${username}' AND password = '${password}'`, function (error, results, fields) {
            if (error) {
                console.log(error);
                return res.status(500).json(error);
            }
            if (results.length > 0) {
                connection.query(`DELETE FROM accounts WHERE username = '${username}'`, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return res.status(500).json(error);
                    }
                    res.send("Account deleted");
                    res.end();
                });
            } else {
                res.send("Mauvais Nom d'utlisateur et/ou mauvais mot de passe<br>");
                res.end();
            }

        });
    } else {
        res.send("Veuillez rentrer un Nom d'utlisateur et mot de passe<br>");
        res.end();
    }

});

app.get('/manage', function (req, res) {

    if (req.session.loggedin) {
        let usernames = req.session.username;

        res.render('manage', {
            username: usernames
        });

    } else {
        // Pas connectée.
        res.redirect("/login")
    }

});



app.get('/404', function (req, res, next) {
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
    next();
});

app.get('/403', function (req, res, next) {
    // trigger a 403 error
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

app.get('/500', function (req, res, next) {
    // trigger a generic (500) error
    next(new Error('keyboard cat!'));
});

app.use(function (req, res, next) {
    res.status(404);

    res.format({
        html: function () {
            res.render('404', { url: req.url })
        },
        json: function () {
            res.json({ error: 'Not found' })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    })
});




//500 error render
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', { error: err });
});