var express = require('express');
var router = express.Router();

//BOARDS-----------------------
router.route('/users')

    .post(function(req,res){
        res.json({messege: 'called /users POST api'})
    })
    .get(function(req,res){
        res.json({messege: 'called /users GET api'})
    });

router.route('/users/:user_id')

    .get(function(req,res){
        res.json({messege: 'called /users/:user_id GET api with value:' + req.params.user_id});
    })
    .put(function(req,res){
        res.json({messege: 'called /users/:user_id PUT api with value:' + req.params.user_id})
    })
    .delete(function(req,res){
        res.json({messege: 'called /users/:user_id DELETE api with value:' + req.params.user_id})
    });
//END_BOARDS-------------------

module.exports = router;
