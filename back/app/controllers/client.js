var Client = require('../models/client.js');

module.exports = {
  postClients : function(req,res){
      var client = new Client();

      client.name = req.body.name;
      client.id = req.body.id;
      client.secret = req.body.secret;
      client.userId = req.user._id;

      client.save(function(err){
          if(err) {res.send(err);}
          else {res.json({message: 'Client added', data: client});}
      });
  },
  getClients : function(req,res){
      Client.find({userId: req.user._id}, function(err,clients){
          if(err) res.send(err);

          res.json(clients);
      });
  }
}
