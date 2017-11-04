var User = require('../models/user.js');

module.exports = {
  postUsers : function(req,res){
      var user = new User({
          username: req.body.username,
          password: req.body.password
      });
      user.save(function(err){
          if(err)
              res.send(err);
          res.json({message: 'user: '+req.body.username+' created'});
      });
  },
  getUsers : function(req,res){
      User.find(function(err, users){
          if(err)
              res.send(err);
          res.json(users);
      });
  },
  getUser : function(req,res){
    const user_id = req.params.user_id;
    User.findOne({userId: user_id}, function(err,user){
      if(err)
        res.send(err);
      else
        res.json(user);
    })
  },
  putUser : function(req,res){
    const user_id = req.params.user_id;
    User.findOne({userId: user_id}, function(err,user){
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
  },
  deleteUser : function(req,res){
          res.json({messege: 'cant do that, bro'})
  }
}
