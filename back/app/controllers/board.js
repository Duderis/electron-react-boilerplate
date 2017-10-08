var arrUniq = require('../utils');
var Board = require('../models/board.js');

exports.postBoards = function(req,res){
  var board = new Board({
    name: req.body.name,
    description: req.body.description,
    lanes: []
  });
}

exports.getBoards = function(req,res){
  Board.find((err,boards)=>{
    if(err)
      res.send(err);
    else
      res.json(boards);
  })
}

exports.getBoard = function(req,res){
  Board.findOne({boardId: req.params.board_id}, (err,board)=>{
    if(err)
      res.send(err);
    else
      res.json(board);
  })
}

exports.putBoard = function(req,res){
  Board.findOne({boardId: req.params.board_id}, (err, board)=>{
    if(err)
      res.send(err);
    else {
      board.name = req.body.name || board.name;
      board.description = req.body.description || board.description;
      if(req.body.tasks){
        board.tasks = arrUniq(board.tasks.concat(req.body.tasks));
      }
      board.save(err=>{
        if(err)
          res.send(err);
        else
          res.json(board);
      })
    }
  })
}

exports.deleteBoard = function(req,res){
  Board.findOneAndRemove({boardId: req.params.board_id}, err=>{
    if(err)
      res.send(err);
    else
      res.json({message: "deleted board"});
  })
}
