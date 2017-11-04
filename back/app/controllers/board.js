const Board = require('../models/board');

module.exports = {
  postBoards : function (req, res) {
    const board = new Board({
      name: req.body.name,
      description: req.body.description || '',
      lanes: req.body.lanes || []
    });
    board.save(err => {
      if (err) { res.send(err); } else { res.json(board); }
    });
  },
  getBoards : function (req, res) {
    Board.find((err, boards) => {
      if (err) { res.send(err); } else { res.json(boards); }
    });
  },
  getBoard : function (req, res) {
    Board.findOne({ boardId: req.params.board_id }, (err, board) => {
      if (err) { res.send(err); } else { res.json(board); }
    });
  },
  putBoard : function (req, res) {
    Board.findOne({ boardId: req.params.board_id }, (err, board) => {
      if (err) { res.send(err); } else {
        board.name = req.body.name || board.name;
        board.description = req.body.description || board.description;
        if (req.body.lanes) {
          board.lanes = req.body.lanes;
        }
        board.save(err => {
          if (err) { res.send(err); } else { res.json(board); }
        });
      }
    });
  },
  deleteBoard : function (req, res) {
    Board.findOneAndRemove({ boardId: req.params.board_id }, (err, ele) => {
      ele.remove();
      if (err) { res.send(err); } else { res.json({ message: 'deleted board' }); }
    });
  }
}
