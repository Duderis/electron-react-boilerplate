var Swimlane = require('../models/swimlane.js');

exports.postSwimlanes = function(req,res){
        res.json({messege: 'called /swimlanes POST api'})
}

exports.getSwimlanes = function(req,res){
        res.json({messege: 'called /swimlanes GET api'})
}

exports.getSwimlane = function(req,res){
        res.json({messege: 'called /swimlanes/:swimlane_id GET api with value:' + req.params.swimlane_id});
}

exports.putSwimlane = function(req,res){
        res.json({messege: 'called /swimlanes/:swimlane_id PUT api with value:' + req.params.swimlane_id})
}

exports.deleteSwimlane = function(req,res){
        res.json({messege: 'called /swimlanes/:swimlane_id DELETE api with value:' + req.params.swimlane_id})
}
