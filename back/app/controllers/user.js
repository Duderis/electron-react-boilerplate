var User = require('../models/user.js');

exports.postUsers = function(req,res){
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.save(function(err){
        if(err)
            res.send(err);
        res.json({message: 'user: '+req.body.username+' created'});
    });
}

exports.getUsers = function(req,res){
    User.find(function(err, users){
        if(err)
            res.send(err);
        res.json(users);
    });
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
