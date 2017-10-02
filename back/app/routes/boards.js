var express = require('express');
var router = express.Router();
var boardController = require('../controllers/board.js')

//BOARDS-----------------------
router.route('/boards')

    .post(boardController.postBoards)
    .get(boardController.getBoards);

router.route('/boards/:board_id')

    .get(boardController.getBoard)
    .put(boardController.putBoard)
    .delete(boardController.deleteBoard);
//END_BOARDS-------------------

module.exports = router;
