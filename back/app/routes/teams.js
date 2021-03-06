var express = require('express');
var teamController = require('../controllers/team.js');
var authController = require('../controllers/auth');

var router = express.Router();

router.route('/api/teams')

    .post(authController.isAuthenticated, teamController.postTeams)
    .get(authController.isAuthenticated, teamController.getTeams);

router.route('/api/teams/:team_id')

    .get(authController.isAuthenticated, teamController.getTeam)
    .put(authController.isAuthenticated, teamController.putTeam)
    .delete(authController.isAuthenticated, teamController.deleteTeam);

module.exports = router;
