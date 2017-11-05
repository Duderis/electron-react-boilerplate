var express = require('express');
var oauth2Controller = require('../controllers/oauth2.js');
var authController = require('../controllers/auth.js');

var router = express.Router();

router.route('/api/auth')
  .get(authController.isAuthenticated, authController.dummy);

router.route('/api/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/api/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);

module.exports = router;
