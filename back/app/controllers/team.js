var Team = require('../models/team.js');

exports.postTeams = function(req,res){
        res.json({messege: 'called /teams POST api'})
}

exports.getTeams = function(req,res){
        res.json({messege: 'called /teams GET api'})
}

exports.getTeam = function(req,res){
        res.json({messege: 'called /teams/:team_id GET api with value:' + req.params.team_id});
}

exports.putTeam = function(req,res){
        res.json({messege: 'called /teams/:team_id PUT api with value:' + req.params.team_id})
}

exports.deleteTeam = function(req,res){
        res.json({messege: 'called /teams/:team_id DELETE api with value:' + req.params.team_id})
}
