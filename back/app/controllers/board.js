var Board = require('../models/board.js');

exports.postBoards = function(req,res){
        res.json({messege: 'called /boards POST api'})
}

exports.getBoards = function(req,res){
        res.json({messege: 'called /boards GET api'})
}

exports.getBoard = function(req,res){
        res.json({messege: 'called /boards/:board_id GET api with value:' + req.params.board_id});
}

exports.putBoard = function(req,res){
        res.json({messege: 'called /boards/:board_id PUT api with value:' + req.params.board_id})
}

exports.deleteBoard = function(req,res){
        res.json({messege: 'called /boards/:board_id DELETE api with value:' + req.params.board_id})
}
