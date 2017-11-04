var express = require('express');
var swimlaneController = require('../controllers/swimlane.js');
var authController = require('../controllers/auth');

var router = express.Router();


//SWIMLANES-----------------------
router.route('/api/swimlanes')

    .post(authController.isAuthenticated, swimlaneController.postSwimlanes)
    .get(authController.isAuthenticated, swimlaneController.getSwimlanes);

router.route('/api/swimlanes/:swimlane_id')

    .get(authController.isAuthenticated, swimlaneController.getSwimlane)
    .put(authController.isAuthenticated, swimlaneController.putSwimlane)
    .delete(authController.isAuthenticated, swimlaneController.deleteSwimlane);
//END_SWIMLANES-------------------
module.exports=router;
