var express = require('express');
var router = express.Router();
var boardController = require('../controllers/board.js')
var authController = require('../controllers/auth');

//BOARDS-----------------------
router.route('/api/boards')

    .post(authController.isAuthenticated, boardController.postBoards)
    .get(authController.isAuthenticated, boardController.getBoards);

router.route('/api/boards/:board_id')

    .get(authController.isAuthenticated, boardController.getBoard)
    .put(authController.isAuthenticated, boardController.putBoard)
    .delete(authController.isAuthenticated, boardController.deleteBoard);
//END_BOARDS-------------------

module.exports = router;
