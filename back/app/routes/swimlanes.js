var express = require('express');
var router = express.Router();
var swimlaneController = require('../controllers/swimlane.js');
var authController = require('../controllers/auth');


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
