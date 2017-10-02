var express = require('express');
var router = express.Router();
var swimlaneController = require('../controllers/swimlane.js');

//SWIMLANES-----------------------
router.route('/swimlanes')

    .post(swimlaneController.postSwimlanes)
    .get(swimlaneController.getSwimlanes);

router.route('/swimlanes/:swimlane_id')

    .get(swimlaneController.getSwimlane)
    .put(swimlaneController.putSwimlane)
    .delete(swimlaneController.deleteSwimlane);
//END_SWIMLANES-------------------
module.exports=router;
