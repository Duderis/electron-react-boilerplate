var express = require('express');
var router = express.Router();
var taskController = require('../controllers/task.js');
var authController = require('../controllers/auth');

//TASKS-----------------------
router.route('/tasks')

    .post(authController.isAuthenticated, taskController.postTasks)
    .get(authController.isAuthenticated, taskController.getTasks);

router.route('/tasks/:task_id')

    .get(taskController.getTask)
    .put(taskController.putTask)
    .delete(taskController.deleteTask);
//END_TASKS-------------------

module.exports = router;
