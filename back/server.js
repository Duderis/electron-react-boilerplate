const express = require('express');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const ejs = require('ejs');
const session = require('express-session');

const db = mongoose.connect('mongodb://localhost:27017/solid_disco', { useMongoClient: true });
// console.log(db);
autoIncrement.initialize(db);

app.set('views', `${__dirname}/app/views`);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(session({
  secret: 'secretkey',
  saveUninitialized: true,
  resave: true
}));

const port = process.env.PORT || 8080;

const router = express.Router();

// middleware
router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'All your base are belong to us' });
});

const boards = require('./app/routes/boards.js');
const swimlanes = require('./app/routes/swimlanes.js');
const tasks = require('./app/routes/tasks.js');
const teams = require('./app/routes/teams.js');
const users = require('./app/routes/users.js');
const clients = require('./app/routes/client.js');
const oauth2 = require('./app/routes/oauth2.js');

app.use('/api', router);

app.use(boards);
app.use(swimlanes);
app.use(tasks);
app.use(teams);
app.use(users);
app.use(clients);
app.use(oauth2);

app.listen(port);
console.log(`Server on ${port}`);
