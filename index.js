var compression = require('compression'),
    express = require('express'),
    app = express(),
    colors = require('colors'),
    moment = require('moment'),
    fs = require('fs'),
    helmet = require('helmet'),
    path = require('path'),
    bodyParser = require("body-parser"),
    port = process.env.PORT || 3000;


app.listen(port)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(compression())
app.set('view engine', 'ejs')

app.use('/src', express.static(path.join(__dirname, 'src')))

/*une fois que vous avez l'intention de traiter des fichiers texte d'une taille supérieure à environ 10 Mo
,je vous conseille de laisser tomber readFile et de commencer à utiliser les flux(fs.readfilestream).
*/


colors.setTheme({ //mettre des couleur sur le console.log
    silly: 'rainbow',
    input: 'grey', //contribution
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});
console.log('---------------------------------'.verbose)

console.log(('Langue:' + moment.locale('fr') + 'ançaise\n').silly + //Langue française
    '---------------------------------'.verbose +
    '\nDémarré le :\n'.info +
    moment().format('llll').prompt + `\nPort: ${port}`.info)



function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.get('/notexist', function (req, res) {
    console.log('Le fichier ici: '.error + './Page web/notexist/index.html'.warn + ' n\'éxiste pas'.error)
    console.log('Chargement du message de '.info + '\"Erreur'.error + ' Foetal !\"'.silly)
    console.log('Cause de l\'erreur: le fichier html qui vous dit que le fichier n\'existe ben lui aussi il n\'hésite pas'.white)
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('<!DOCTYPE html>' +
        '<html>' +
        '    <head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>' +
        '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>' +
        '        <title>Erreur Fatal !</title>' +
        '    </head>' +
        '    <body> <div>' +
        '     	<H3>Vous avez été redirigée ici car le fichier html qui vous dit que le fichier n\'existe pas lui aussi' +
        '         il n\'existe pas !</H3><br><br> ' +
        '<a onclick="javascript:window.history.back()" class="btn-large waves-effect waves-light orange">Cliquer ici pour revenir en arrière</a><br><br>' +
        '<br><br><a href="/" class="btn-large waves-effect waves-light orange">Cliquer ici pour revenir sur l\'acceuil</a><br><br>' +
        '<H5>Si ce lien juste au dessue recharge la page ça veut dire que  l\'acceuil n\'existe pas,attendez que le dev regle le probléme</H5>' +
        '    <div> </body>' +
        '</html>');
    res.end();
}) // fin app get notexists



var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon


app.use(morgan('combined')) // Active le middleware de logging
    // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
    .use(favicon(__dirname + '/public/favicon.ico'))
    .use(function (req, res) { // Répond enfin
        res.render('index');
    });