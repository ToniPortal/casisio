var compression = require('compression'),
    express = require('express'),
    app = express(),
    colors = require('colors'),
    moment = require('moment'),
    fs = require('fs'),
    helmet = require('helmet'),
    port = process.env.PORT || 3000;
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.listen(port)
var bodyParser = require("body-parser");

/*une fois que vous avez l'intention de traiter des fichiers texte d'une taille supérieure à environ 10 Mo
,je vous conseille de laisser tomber readFile et de commencer à utiliser les flux(fs.readfilestream).
*/

app.use('/', express.static(path.join(__dirname, 'views')))

app.get('/', function(req, res) {
    res.render('index.ejs')
})

app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet())
app.use(compression())


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
