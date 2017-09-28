var express = require('express');
var router = express.Router();

//SWIMLANES-----------------------
router.route('/swimlanes')

    .post(function(req,res){
        res.json({messege: 'called /swimlanes POST api'})
    })
    .get(function(req,res){
        res.json({messege: 'called /swimlanes GET api'})
    });

router.route('/swimlanes/:swimlane_id')

    .get(function(req,res){
        res.json({messege: 'called /swimlanes/:swimlane_id GET api with value:' + req.params.swimlane_id});
    })
    .put(function(req,res){
        res.json({messege: 'called /swimlanes/:swimlane_id PUT api with value:' + req.params.swimlane_id})
    })
    .delete(function(req,res){
        res.json({messege: 'called /swimlanes/:swimlane_id DELETE api with value:' + req.params.swimlane_id})
    });
//END_SWIMLANES-------------------
module.exports=router;
