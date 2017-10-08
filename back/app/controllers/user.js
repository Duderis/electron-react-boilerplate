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
    User.findOne({userId: req.params.user_id} (err,user)=>{
      if(err)
        res.send(err);
      else
        res.json(user);
    })
}

exports.putUser = function(req,res){
    User.findOne({userId: req.params.user_id} (err,user) =>{
      if(err)
        res.send(err);
      else {
        if(req.body.password){
          user.password = req.body.password;
          user.save(err=>{
            if(err)
              res.send(err);
            else
              res.json('Updated '+user.username+' password.');
          });
        }
      }
    });
}

exports.deleteUser = function(req,res){
        res.json({messege: 'cant do that, bro'})
}
