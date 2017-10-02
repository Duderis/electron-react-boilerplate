var User = require('../models/user.js');

exports.postUsers = function(req,res){
        res.json({messege: 'called /users POST api'})
}

exports.getUsers = function(req,res){
        res.json({messege: 'called /users GET api'})
}

exports.getUser = function(req,res){
        res.json({messege: 'called /users/:user_id GET api with value:' + req.params.user_id});
}

exports.putUser = function(req,res){
        res.json({messege: 'called /users/:user_id PUT api with value:' + req.params.user_id})
}

exports.deleteUser = function(req,res){
        res.json({messege: 'called /users/:user_id DELETE api with value:' + req.params.user_id})
}
