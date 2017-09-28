var express = require('express');
var router = express.Router();

//BOARDS-----------------------
router.route('/teams')

    .post(function(req,res){
        res.json({messege: 'called /teams POST api'})
    })
    .get(function(req,res){
        res.json({messege: 'called /teams GET api'})
    });

router.route('/teams/:team_id')

    .get(function(req,res){
        res.json({messege: 'called /teams/:team_id GET api with value:' + req.params.team_id});
    })
    .put(function(req,res){
        res.json({messege: 'called /teams/:team_id PUT api with value:' + req.params.team_id})
    })
    .delete(function(req,res){
        res.json({messege: 'called /teams/:team_id DELETE api with value:' + req.params.team_id})
    });
//END_BOARDS-------------------

module.exports = router;
