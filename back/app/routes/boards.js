var express = require('express');
var router = express.Router();

//BOARDS-----------------------
router.route('/boards')

    .post(function(req,res){
        res.json({messege: 'called /boards POST api'})
    })
    .get(function(req,res){
        res.json({messege: 'called /boards GET api'})
    });

router.route('/boards/:board_id')

    .get(function(req,res){
        res.json({messege: 'called /boards/:board_id GET api with value:' + req.params.board_id});
    })
    .put(function(req,res){
        res.json({messege: 'called /boards/:board_id PUT api with value:' + req.params.board_id})
    })
    .delete(function(req,res){
        res.json({messege: 'called /boards/:board_id DELETE api with value:' + req.params.board_id})
    });
//END_BOARDS-------------------

module.exports = router;
