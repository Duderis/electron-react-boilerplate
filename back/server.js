var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var boards = require('./app/routes/boards.js');
var swimlanes = require('./app/routes/swimlanes.js');
var tasks = require('./app/routes/tasks.js');
var teams = require('./app/routes/teams.js');
var users = require('./app/routes/users.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

//middleware
router.use(function(req, res, next){
    console.log('api called');
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

app.listen(port);
console.log('Server on '+ port);
