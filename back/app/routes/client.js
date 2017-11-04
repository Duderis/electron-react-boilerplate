var express = require('express');
var clientController = require('../controllers/client.js');
var authController = require('../controllers/auth');

var router = express.Router();

router.route('/api/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

module.exports = router;
