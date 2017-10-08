var arrUniq = require('../utils');
var Team = require('../models/team.js');


exports.postTeams = function(req,res){
  var team = new Team({
    name: req.body.teamName,
    users: [],
    boards: []
  });
  if(req.body.addCurrent){
    team.users.push(req.user._id);
  }
  team.save(err=>{
    if(err)
      res.send(err);
    else
      res.json(team);
  })
}

exports.getTeams = function(req,res){
  Team.find((err,teams)=>{
    if(err)
      res.send(err);
    else
      res.json(teams);
  });
}

exports.getTeam = function(req,res){
  Team.findOne({teamId: req.params.team_id}, (err,team)=>{
    if(err)
      res.send(err);
    else
      res.json(team);
  })
}

exports.putTeam = function(req,res){
  Team.findOne({teamId: req.params.team_id}, (err,team)=>{
    if(err)
      res.send(err);
    else{
      team.name = req.body.name || team.name;
      if(req.body.users){
        team.users = arrUniq(team.users.concat(req.body.users));
      }
      if(req.body.boards){
        team.boards = arrUniq(team.boards.concat(req.body.boards));
      }
      team.save(err=>{
        if(err)
          res.send(err);
        else
          res.json(team);
      })
    }
  })
}

exports.deleteTeam = function(req,res){
  Team.findOneAndRemove({teamId: req.params.team_id}, err=>{
    if(err)
      res.send(err);
    else
      res.json({message: 'deleted Team'});
  })
}
