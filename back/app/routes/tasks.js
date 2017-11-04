var express = require('express');
var taskController = require('../controllers/task.js');
var authController = require('../controllers/auth');

var router = express.Router();

//TASKS-----------------------
router.route('/api/tasks')

    .post(authController.isAuthenticated, taskController.postTasks)
    .get(authController.isAuthenticated, taskController.getTasks);

router.route('/api/tasks/:task_id')

    .get(taskController.getTask)
    .put(taskController.putTask)
    .delete(taskController.deleteTask);
//END_TASKS-------------------

module.exports = router;
