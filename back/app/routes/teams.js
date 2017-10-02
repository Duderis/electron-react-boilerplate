var express = require('express');
var router = express.Router();
var teamController = require('../controllers/team.js');

router.route('/teams')

    .post(teamController.postTeams)
    .get(teamController.getTeams);

router.route('/teams/:team_id')

    .get(teamController.getTeam)
    .put(teamController.putTeam)
    .delete(teamController.deleteTeam);

module.exports = router;
