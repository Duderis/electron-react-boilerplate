var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');
var authController = require('../controllers/auth.js');

router.route('/users')

    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/users/:user_id')

    .get(userController.getUser)
    .put(userController.putUser)
    .delete(userController.deleteUser);

module.exports = router;
