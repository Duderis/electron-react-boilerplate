var express = require('express');
var userController = require('../controllers/user.js');
var authController = require('../controllers/auth.js');

var router = express.Router();

router.route('/api/users')

    .post(userController.postUsers)
    .get(userController.getUsers);

router.route('/api/users/:user_id')

    .get(authController.isAuthenticated, userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(userController.deleteUser);

module.exports = router;
