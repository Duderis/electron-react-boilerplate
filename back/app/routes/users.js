var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');
var authController = require('../controllers/auth.js');

router.route('/users')

    .post(userController.postUsers)
    .get(userController.getUsers);

router.route('/users/:user_id')

    .get(authController.isAuthenticated, userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(userController.deleteUser);

module.exports = router;
