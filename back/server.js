var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');

var boards = require('./app/routes/boards.js');
var swimlanes = require('./app/routes/swimlanes.js');
var tasks = require('./app/routes/tasks.js');
var teams = require('./app/routes/teams.js');
var users = require('./app/routes/users.js');
var clients = require('./app/routes/client.js');
var oatuh2 = require('./app/routes/oauth2.js');

mongoose.connect('mongodb://localhost:27017/solid_disco',{useMongoClient: true});

app.set('views', __dirname+'/app/views');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(session({
    secret: 'secretkey',
    saveUninitialized: true,
    resave: true
}));

var port = process.env.PORT || 8080;

var router = express.Router();

//middleware
router.use(function(req, res, next){
    console.log('sexy api called');
    next();
});

router.get('/', function(req,res){
    res.json({message: 'All your base are belong to us'});
});

app.use('/api',router);

app.use('/api',boards);
app.use('/api',swimlanes);
app.use('/api',tasks);
app.use('/api',teams);
app.use('/api',users);
app.use('/api',clients);
app.use('/api',oatuh2);

app.listen(port);
console.log('Server on '+ port);
